

var intervalId = window.setInterval(function(){
  generateClock()
}, 1000/fps);

time = getTimeString(0)
previousTime = getTimeString(-1)

usedSegments = getUsedSegments()
segments = getDisplaySegments(usedSegments)
upcomingSegments = getUpcomingSegments()

function generateClock() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	time = getTimeString(0)

	if (time !== previousTime) {
		usedSegments = getUsedSegments()
		segments = getDisplaySegments(usedSegments)
		upcomingSegments = getUpcomingSegments()
	}
	drawDisplaySegments(segments)
	drawUpcomingSegments(upcomingSegments)
	drawUsedSegments(usedSegments)

	previousTime = time
}

function getUsedSegments() {
	usedSegments = []
	for (let i=0; i<secondsUsed; i++) {
		usedSegments.push(getExclusiveSegments(getSegmentsFromTime(-i), getSegmentsFromTime(-i+1)))
	}
	return usedSegments
}
function drawUsedSegments(segments) {
	for (let i=0; i<segments.length; i++) {
		for (let j=0; j<segments[i].length; j++) {
			segments[i][j].forEach(segmentIndex =>
				displaySegment({x: clockOffset.x + j * (charGap + charSize.x), y: clockOffset.y + i * (charSize.y + verticalCharGap) + getTimeBasedVerticalFallingOffset()}, segmentIndex)
			)
		}
	}
}

function getUpcomingSegments() {
	upcomingSegments = []
	for (let i=1; i<=secondsUpcoming; i++) {
		upcomingSegments.push(getExclusiveSegments(getSegmentsFromTime(i), getSegmentsFromTime(i - 1)))
	}
	return upcomingSegments
}
function drawUpcomingSegments(segments) {
	for (let i=0; i<segments.length; i++) {
		for (let j=0; j<segments[i].length; j++) {
			segments[i][j].forEach(segmentIndex =>
				displaySegment({x: clockOffset.x + j * (charGap + charSize.x), y: clockOffset.y - (i + 1) * (charSize.y + verticalCharGap) + getTimeBasedVerticalFallingOffset()}, segmentIndex)
			)
		}
	}
}

function getDisplaySegments(usedSegments) {
	milliseconds = new Date().getMilliseconds()
	if (milliseconds < 1000 - movingTime) {
		return getSegmentsFromTime(0)
	}
	else {
		return getExclusiveSegments(getSegmentsFromTime(0), usedSegments[0])
	}
}
function drawDisplaySegments(segments) {
	for (let i=0; i<segments.length; i++) {
		segments[i].forEach(segmentIndex =>
			displaySegment({x: clockOffset.x + i * (charGap + charSize.x), y: clockOffset.y}, segmentIndex)
		)
	}
}

function getTimeBasedVerticalFallingOffset() {
	milliseconds = new Date().getMilliseconds()
	if (milliseconds < 1000 - movingTime) {
		return 0
	}
	else {
		milliseconds -= 1000 - (movingTime / 2)
		let scaledMilliseconds = (milliseconds / movingTime) * Math.PI
		let cosScaledDistance = (Math.sin(scaledMilliseconds) + 1) / 2
		return cosScaledDistance * (charSize.y + verticalCharGap)
	}
}

function getExclusiveSegments(segments, filterSegments) {
	let newSegments = []
	for (let i=0; i<segments.length; i++) {
		newSegments.push([])
		for (let j=0; j<segments[i].length; j++) {
			if (!filterSegments[i].includes(segments[i][j])) {
				newSegments[i].push(segments[i][j])
			}
		}
	}
	return newSegments
}

function getSegmentsFromTime(offset) {
	time = getFormattedTime(offset)
	let segments = []

	if (time.hour.length == 2) {
		segments.push(segmentsForChar[time.hour[0]])
		segments.push(segmentsForChar[time.hour[1]])
	}
	else {
		segments.push([])
		segments.push(segmentsForChar[time.hour[0]])
	}
	segments.push(segmentsForChar[":"])
	segments.push(segmentsForChar[time.minute[0]])
	segments.push(segmentsForChar[time.minute[1]])
	segments.push(segmentsForChar[":"])
	segments.push(segmentsForChar[time.second[0]])
	segments.push(segmentsForChar[time.second[1]])

	return segments
}

function getFormattedTime(offset) {
	let time = new Date(new Date().getTime() + (offset * 1000))

	return { 
		hour: time.getHours().toString(),
		minute: time.getMinutes().toString().padStart(2, "0"),
		second: time.getSeconds().toString().padStart(2, "0")
	}
}

function getTimeString(offset) {
	let time = getFormattedTime(offset)
	return time.hour + ":" + time.minute + ":" + time.second
}
