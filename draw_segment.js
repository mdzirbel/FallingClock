
const middleSegmentOffsetY = 2 * segmentGap + height - width
const rightSegmentOffsetX = 2 * segmentGap + height - width
const LowerVerticalSegmentOffsetY = 3 * segmentGap + height - width

const segmentOffsets = [
	{ x: segmentGap, y: 0 },
	{ x: 0, y: segmentGap},
	{ x: rightSegmentOffsetX, y: segmentGap},
	{ x: segmentGap, y: middleSegmentOffsetY},
	{ x: 0, y: LowerVerticalSegmentOffsetY},
	{ x: rightSegmentOffsetX, y: LowerVerticalSegmentOffsetY},
	{ x: segmentGap, y: 2 * (middleSegmentOffsetY)},
]

function displaySegment(charOffset, segmentIndex) {
	if (segmentIndex === 7) {
		drawColon(charOffset)
	}
	else {
		let segmentOffset = {
			x: charOffset.x + segmentOffsets[segmentIndex].x,
			y: charOffset.y + segmentOffsets[segmentIndex].y,
		}
		drawSegmentPolygon(segmentOffset, segmentIndex)
	}
}

function drawSegmentPolygon(offset, segmentIndex) {
	ctx.fillStyle = segmentColor
	ctx.beginPath()
	if (segmentIndex % 3 === 0) { // Wide segment
		ctx.moveTo(offset.x + champfer, offset.y)
		ctx.lineTo(offset.x + height - champfer, offset.y)
		ctx.lineTo(offset.x + height, offset.y + width / 2)
		ctx.lineTo(offset.x + height - champfer, offset.y + width)
		ctx.lineTo(offset.x + champfer, offset.y + width)
		ctx.lineTo(offset.x, offset.y + width / 2)
	}
	else { // Tall segment
		ctx.moveTo(offset.x, offset.y + champfer)
		ctx.lineTo(offset.x + width / 2, offset.y)
		ctx.lineTo(offset.x + width, offset.y + champfer)
		ctx.lineTo(offset.x + width, offset.y + height - champfer)
		ctx.lineTo(offset.x + width / 2, offset.y + height)
		ctx.lineTo(offset.x, offset.y + height - champfer)
	}
	ctx.closePath()
	ctx.fill()
}

function drawColon(offset) {
	ctx.fillStyle = colonColor
	colonHeights = [-colonGap / 2, colonGap / 2]
	colonHeights.forEach(function(colonHeight) {
		ctx.beginPath()
		ctx.moveTo(offset.x + charSize.x / 2, offset.y + colonHeight + charSize.y / 2 - colonWidth / 2)
		ctx.lineTo(offset.x + charSize.x / 2 + colonWidth / 2, offset.y + colonHeight + charSize.y / 2)
		ctx.lineTo(offset.x + charSize.x / 2, offset.y + colonHeight + charSize.y / 2 + colonWidth / 2)
		ctx.lineTo(offset.x + charSize.x / 2 - colonWidth / 2, offset.y + colonHeight + charSize.y / 2)
		ctx.closePath()
		ctx.fill()
	})
}