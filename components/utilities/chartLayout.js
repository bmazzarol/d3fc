(function (d3, sl) {
    'use strict';

    sl.utilities.chartLayout = function () {

        // Default values
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = 0,
            height = 0;

        var defaultWidth = true,
            defaultHeight = true;

        var chartLayout = function (selection) {
            selection.each( function () {
                var element = d3.select(this),
                    style = getComputedStyle(this);

                // Attempt to automatically size the chart to the selected element
                if (defaultWidth === true) {
                    // Set the width of the chart to the width of the selected element,
                    // excluding any margins, padding or borders
                    var paddingWidth = parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
                    width = this.clientWidth - paddingWidth;

                    // If the new width is too small, use a default width
                    if (chartLayout.innerWidth() < 1) {
                        width = 800 + margin.left + margin.right;
                    }
                }

                if (defaultHeight === true) {
                    // Set the height of the chart to the height of the selected element,
                    // excluding any margins, padding or borders
                    var paddingHeight = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);
                    height = this.clientHeight - paddingHeight;

                    // If the new height is too small, use a default height
                    if (chartLayout.innerHeight() < 1) {
                        height = 400 + margin.top + margin.bottom;
                    }
                }

                // Create svg
                var svg = element.append('svg')
                    .attr('width', width)
                    .attr('height', height);

                // Create group for the chart
                var chart =  svg.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // Clipping path
                chart.append('defs').append('clipPath')
                    .attr('id', 'plotAreaClip')
                    .append('rect')
                    .attr({ width: chartLayout.innerWidth(), height: chartLayout.innerHeight() });

                // Create plot area, using the clipping path
                chart.append('g')
                    .attr('clip-path', 'url(#plotAreaClip)')
                    .attr('class', 'plotArea');
            });
        };

        chartLayout.marginTop = function (value) {
            if (!arguments.length) {
                return margin.top;
            }
            margin.top = value;
            return chartLayout;
        };

        chartLayout.marginRight = function (value) {
            if (!arguments.length) {
                return margin.right;
            }
            margin.right = value;
            return chartLayout;
        };

        chartLayout.marginBottom = function (value) {
            if (!arguments.length) {
                return margin.bottom;
            }
            margin.bottom = value;
            return chartLayout;
        };

        chartLayout.marginLeft = function (value) {
            if (!arguments.length) {
                return margin.left;
            }
            margin.left = value;
            return chartLayout;
        };

        chartLayout.width = function (value) {
            if (!arguments.length) {
                return width;
            }
            width = value;
            defaultWidth = false;
            return chartLayout;
        };

        chartLayout.height = function (value) {
            if (!arguments.length) {
                return height;
            }
            height = value;
            defaultHeight = false;
            return chartLayout;
        };

        chartLayout.innerWidth = function () {
            var innerWidth = width - margin.left - margin.right;
            return innerWidth;
        };

        chartLayout.innerHeight = function () {
            var innerHeight = height - margin.top - margin.bottom;
            return innerHeight;
        };

        return chartLayout;
    };
}(d3, sl));