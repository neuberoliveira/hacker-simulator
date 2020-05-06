module.exports = {
	calcWidth: (ratio, originalHeight) => (originalHeight / ratio.h) * ratio.w,
	calcHeight: (ratio, originalWidth) => (originalWidth / ratio.w) * ratio.h,
}