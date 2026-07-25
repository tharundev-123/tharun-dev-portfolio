Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$outputFile = "C:\Users\THARUN DEV\.gemini\antigravity\scratch\tharun-dev-portfolio\public\voice.wav"
$synth.SetOutputToWaveFile($outputFile)
$text = "Hello! I am Tharun Dev. Welcome to my digital portfolio. I am currently pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning. I love building software, exploring AI, cloud technologies, and solving real-world problems using technology. Take a look around and explore my projects, certifications, and journey. Thank you for visiting!"
$synth.Speak($text)
$synth.Dispose()
Write-Host "SUCCESSFULLY CREATED VOICE.WAV!"
