
// Fix the canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const
	width = 12,
	height = 50,
	champfer = 6,
	segmentGap = 10,
	charGap = 16,
	verticalCharGap = 50,
	segmentColor = '#fff'

	colonWidth = 18,
	colonGap = 70,
	colonColor = "#fff"

	movingTime = 300

	secondsUsed = 8
	secondsUpcoming = 8

	fps = 40

const segmentsForChar = {
	"0": [0, 1, 2,    4, 5, 6],
	"1": [      2,       5   ],
	"2": [0,    2, 3, 4,    6],
	"3": [0,    2, 3,    5, 6],
	"4": [   1, 2, 3,    5,  ],
	"5": [0, 1,    3,    5, 6],
	"6": [0, 1,    3, 4, 5, 6],
	"7": [0,    2,       5,  ],
	"8": [0, 1, 2, 3, 4, 5, 6],
	"9": [0, 1, 2, 3,    5, 6],
	":": [7],
}

const charSize = {
	x: 2 * segmentGap + height,
	y: 4 * segmentGap + 2 * height - width,
}

const clockHeightPercent = .5

const clockOffset = {
	x: canvas.width / 2 - (charGap * 7 + charSize.x * 9.8) / 2,
	y: canvas.height * clockHeightPercent - (charSize.y / 2)
}


