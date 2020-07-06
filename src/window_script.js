
setTimeout(() => {

	/**
	 * runDead allow you to run a function and let it fail without halting the processing of other tasks.
	 *
	 * @param {function} fn Function to Run.
	 */
	function runDead(fn){
		try {
			return fn();
		}
		catch(err) {
			// Ignore the error
			return undefined;
		}
	}

	let frame = document.getElementById('videoFrame');
	let frameBody = frame.contentWindow.document.body;

	//frame.style = "pointer-events: none;"; // Prevent Hover and Click Events.

	// Hide Watch Later Button
	runDead(() => { frameBody.getElementsByClassName("ytp-chrome-top-buttons")[0].style = "display:none !important"; });
	// Hide Share Button
	runDead(() => { frameBody.getElementsByClassName("ytp-chrome-top-buttons")[1].style = "display:none !important";});
	// Hide Show cards Button
	runDead(() => { frameBody.getElementsByClassName("ytp-chrome-top-buttons")[2].style = "display:none !important";});

	// Hide Fullscreen Button
	runDead(() => { frameBody.getElementsByClassName("ytp-fullscreen-button")[0].style = "display:none !important"; });
	// Hide YouTube Size Select
	runDead(() => { frameBody.getElementsByClassName("ytp-size-button")[0].style = "display:none !important"; });
	// Hide SubTitles Button (Just in case)
	runDead(() => { frameBody.getElementsByClassName("ytp-subtitles-button")[0].style = "display:none !important"; });
	// Hide Title of the Video
	runDead(() => { frameBody.getElementsByClassName("ytp-title")[0].style = "display:none !important"; });
	// Hide Image Preview on Time Bar
	runDead(() => { frameBody.getElementsByClassName("ytp-tooltip-bg")[0].style = "display:none !important"; });

	frameBody.onload = () => {
		// Hide Subscribe Button from UI Icon
		runDead(() => { frameBody.getElementsByClassName("branding-context-container-outer")[0].style = "display:none !important"; });
		// Remove CSS Hover CSS from the Channel Icon
		runDead(() => { frameBody.getElementsByClassName("branding-img-container")[0].children[0].classList.remove("iv-click-target"); });
	};

	const videoList = [
		{
			title: "ChilledCow - beats to sleep/chill to",
			videoId: "DWcJFNfaw9c"
		},
		{
			title: "ChilledCow - beats to relax/study to",
			videoId: "5qap5aO4i9A"
		},
		{
			title: "Chillhop Music - jazzy beats / lofi hip hop",
			videoId: "5yx6BWlEVcY",
			default: true
		},
		{
			title: "Chillhop Music - beats to study/relax to",
			videoId: "7NOSDKb0HlU"
		}
	];

	let vid = videoList.find(v => v.default === true);
	frame.src = `https://www.youtube-nocookie.com/embed/${vid.videoId}?autoplay=true&disablekb=0&enablejsapi=1&modestbranding=1`;

	console.log(frame.src, vid.videoId);

}, 500);