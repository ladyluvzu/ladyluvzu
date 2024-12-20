window.onload = function () {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const audio = document.getElementById('audio');

    // Set canvas size to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set up AudioContext and AnalyserNode
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;  // Set the FFT size for frequency data

    // Connect audio to analyser and analyser to audio context
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;  // Number of frequency data points
    const dataArray = new Uint8Array(bufferLength);  // Array to store frequency data

    // Function to render visualizer frame
    function renderFrame() {
        analyser.getByteFrequencyData(dataArray);  // Get frequency data

        // Clear previous frame
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';  // Slight transparency to create trailing effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;  // Calculate bar width based on number of data points
        let barHeight;
        let x = 0;

        const color = 'rgba(255, 255, 255, 0.7)';  // White color for bars

        // Draw each bar based on the frequency data
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];  // Get the frequency value for this point

            ctx.fillStyle = color;  // Set bar color
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);  // Draw the bar

            x += barWidth + 1;  // Increment x position for next bar
        }

        // Request the next animation frame
        requestAnimationFrame(renderFrame);
    }

    // Start visualizer when audio starts playing
    audio.onplay = () => {
        audioContext.resume().then(() => {
            renderFrame();  // Start rendering frames when the audio plays
        });
    };
};
