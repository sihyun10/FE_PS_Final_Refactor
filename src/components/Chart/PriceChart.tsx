import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import styled from '@emotion/styled';

interface ActualTransactionPrice {
  contract_date: string;
  transaction_type: string;
  price: number;
  floor: number;
  asking_price: number;
}

interface MarketPrice {
  reference_date: string;
  transaction_type: string;
  lower_avg_price: number;
  avg_price: number;
  upper_avg_price: number;
  sales_vs_rent_price: string;
}

interface Data {
  actualTransactionPrice: ActualTransactionPrice[];
  marketPrice: MarketPrice[];
}

const Chart = ({ actualTransactionPrice, marketPrice }: Data) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const margin = { top: 10, right: 10, bottom: 10, left: 40 };
  const width = 480 - margin.left - margin.right;
  const height = 210 - margin.top - margin.bottom;

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const svg = d3.select(ref.current);

    const marketPrices = marketPrice.map((item) => item.lower_avg_price);
    const transactionPrices = actualTransactionPrice.map((item) => item.price);
    const minPrice = Math.min(...marketPrices, ...transactionPrices);
    const maxPrice = Math.max(
      ...actualTransactionPrice.map((d) => d.price),
      ...marketPrice.map((d) => d.upper_avg_price),
    );
    const parseDate = (date: string | null) => {
      return date ? d3.timeParse('%Y%m%d')(date) : null;
    };

    const formatPrice = (price: number) => {
      const billion = Math.floor(price / 10000);
      const million = price % 10000;

      let formattedPrice = `${billion}억`;
      if (million > 0) {
        formattedPrice += ` ${million.toLocaleString('ko-KR')}`;
      }

      return formattedPrice;
    };

    const formatContractDate = (contractDate: string) => {
      const year = contractDate.slice(2, 4);
      const month = parseInt(contractDate.slice(4, 6), 10);
      const day = parseInt(contractDate.slice(6, 8), 10);

      return `${year}년 ${month}월 ${day}일`;
    };
    const x = d3
      .scaleTime()
      .domain(d3.extent(marketPrice, (d) => parseDate(d.reference_date)) as [Date, Date])
      .range([margin.left, width + margin.left - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([minPrice ? minPrice * 0.9 : 0, maxPrice ? maxPrice * 1.1 : 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // const area = d3
    //   .area<MarketPrice>()
    //   .curve(d3.curveLinear)
    //   .x((d) => (parseDate(d.reference_date) ? x(parseDate(d.reference_date)!) ?? 0 : 0))
    //   .y0((d) => y(Math.min(d.lower_avg_price, d.upper_avg_price)))
    //   .y1((d) => y(Math.max(d.lower_avg_price, d.upper_avg_price)));

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).tickSize(-width).ticks(3).tickFormat(d3.format('.2s')); // 이것은 선택 사항이며, 틱 레이블의 형식을 지정합니다.

    const xActual = d3
      .scaleBand()
      .domain(actualTransactionPrice.map((d) => d.contract_date))
      .range([margin.left, width + margin.left - margin.right])
      .padding(0.1);

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg.selectAll('.x-axis *').remove();

    svg.selectAll('.x-axis text').style('font-size', '12px').style('color', '#8f8f8f');

    svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .call((g) => g.select('.domain').remove()) // 이 부분은 Y축의 선을 제거합니다.
      .call(
        (g) =>
          g
            .selectAll('.tick line') // 이 부분은 그리드 라인의 스타일을 지정합니다.
            .attr('stroke', '#ddd'), // 회색으로 설정
      ) // 점선으로 설정
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', -margin.left)
      .attr('y', margin.top - 10)
      .attr('dy', '.71em')
      .style('text-anchor', 'start')
      .text('Price');

    const hoverLine = svg
      .append('line')
      .attr('class', 'hover-line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#ff2727')
      .attr('stroke-width', 1)
      .attr('opacity', 0);

    svg.on('mousemove', handleMouseMove).on('mouseout', handleMouseOut);

    function handleMouseMove(event: any) {
      const [xPos] = d3.pointer(event);
      hoverLine.attr('x1', xPos).attr('x2', xPos).attr('opacity', 1);
    }

    function handleMouseOut() {
      hoverLine.attr('opacity', 0);
    }
    // svg
    //   .append('path')
    //   .datum(marketPrice)
    //   .attr('fill', '#E8EAF6')
    //   .attr('stroke', '#1A237E')
    //   .attr('stroke-dasharray', '3 3')
    //   .attr('d', area);

    const tooltip = d3
      .select('#tip')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('border', '1px solid black')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('background-color', 'white')
      .style('position', 'fixed');

    svg
      .selectAll('.dot')
      .data(actualTransactionPrice)
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => (xActual(d.contract_date) ?? 0) + xActual.bandwidth() / 2)
      .attr('cy', (d) => y(d.price))
      .attr('r', 3)
      .attr('fill', '#fd3c19')
      .attr('stroke', '#fd0901c0')
      .attr('stroke-width', 1)
      .on('mouseover', (event, d) => {
        const svgBounds = event.target.ownerSVGElement.getBoundingClientRect();
        const pointer = d3.pointer(event, event.target);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(
            `
          <div style="display: flex; flex-direction: column; font-size: 14px;padding: 10px; gap: 10px; font-weight: bold;">
            <strong style="color: #616161; background-clip: text; width :95px;
             background-image: linear-gradient(to bottom,white 20%, #E8EAF6 80%);">${formatContractDate(
               d.contract_date,
             )}</strong>
            <div style="align-items: center;">
              <span class="tooltip-price">실거래가</span>
              <span class="tooltip-price" style="font-size: 20px; color: #FF5252;">${formatPrice(
                d.price,
              )}</span>
            </div>
          </div>
        `,
          )
          .style('left', `${pointer[0] + svgBounds.left + 28}px`)
          .style('top', `${pointer[1] + svgBounds.top}px`)
          .style('border', '1px solid #1A237E');
      })
      .on('mouseout', (d) => {
        tooltip.transition().duration(500).style('opacity', 0);
      });
    return () => {
      //  초기화
      svg.selectAll('*').remove();
    };
  }, [actualTransactionPrice, marketPrice, height, margin, width]);
  return (
    <div id="tip" style={{ position: 'relative' }}>
      <svg
        ref={ref}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default Chart;

const tooltipDiv = styled.div`
  background-color: aqua;
  width: 30px;
  height: 30px;
`;
