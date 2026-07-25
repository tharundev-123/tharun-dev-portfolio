import win32com.client

text = "Hello! I am Tharun Dev. Welcome to my digital portfolio. I am currently pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning. I love building software, exploring AI, cloud technologies, and solving real-world problems using technology. Take a look around and explore my projects, certifications, and journey. Thank you for visiting!"

try:
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
    stream = win32com.client.Dispatch("SAPI.SpFileStream")
    output_path = r"C:\Users\THARUN DEV\.gemini\antigravity\scratch\tharun-dev-portfolio\public\voice.wav"
    stream.Open(output_path, 3, False)
    speaker.AudioOutputStream = stream
    speaker.Speak(text)
    stream.Close()
    print("SUCCESSFULLY GENERATED REAL PHYSICAL WAV VOICE FILE!")
except Exception as e:
    print("Error:", e)
