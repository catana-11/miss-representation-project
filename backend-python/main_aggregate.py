import yt_dlp  # Step 1
import os
import whisper  # Step 2
import warnings
import google.generativeai as genai  # Step 3
from dotenv import load_dotenv

load_dotenv()

# Download YT audio:

def download_audio(url):
    audio_file = 'audio'  

    # Remove the existing, old prompt's audio file:
    if os.path.exists(audio_file):
        os.remove(audio_file)
        print(f"Deleted existing audio file: {audio_file}")

    ydl_opts = {
        'format': 'bestaudio/best',  # Downloads the best audio quality available
        'outtmpl': audio_file,       # Output filename
        'postprocessors': [{         # Conversion settings
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        print("Download complete:", audio_file)

# Transcribe the downloaded audio!

def transcribe_with_progress(file_path):
    # Load the Whisper model:
    model = whisper.load_model("base") 
    print("Whisper model loaded!")

    # Actual transcription, with automatic language detection:
    result = model.transcribe(file_path, task="translate") # No need to specify language, it will detect automatically
    
    print(result["text"]) # To verify the fact that transcription is being generated
    return result["text"]
    print("Translation/ transcribing is done!")


# Summarize text using Gemini API:

def summarize_with_gemini(transcript_text):

 
    genai.configure(api_key=os.getenv("API_KEY")) # Put your own key please :)


    generation_config = {
        "temperature": 0.9, # To make it more "woke"? Or less "woke"?
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    # Had to include this, because Gemini doesn't take prompt if it contains words like harassment, etc.
    safe = [
        {"category": "HARM_CATEGORY_DANGEROUS", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
    ]

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        safety_settings=safe
    )

    convo = model.start_chat(history=[])
    
    # A BIGGGGGGGG prompt for Gemini :)
    response = convo.send_message(
        f"Hello! You are an unbiased, accurate, and to-the-point summarization tool. "
        f"You are motivating the readers with your summary to take notice of injustice and hate in present world and media and its effects. "
        f"A transcript of a video will be attached below. You need to focus on the choice of words in the given transcript, and find out the sentiment, feelings, and emotions used towards the woman/women in the transcript. "
        f"Point out instances of discrimination, low-grade treatment, indecent attitude, and other relevant instances. "
        f"Also appreciate if there is a good tone, positive behavior, and other motivatory things depicted by the speakers. "
        f"These are the transcripts present in today's media like YouTube, magazines, etc. "
        f"Media causes huge influence over all ages. Hence your summarization will prove fruitful to dispel problems. It is important to use a strong sense of morality, "
        f"and point out the wrong or the right. "
        f"Also, note that the transcript provided to you will include a mixture of different people speaking. "
        f"Someone one other than the subject and the interviewer may speak."
        f"So be aware, and use logic to find out which character is speaking what part. "
        f"Also, make sure that the text is humanized and in easy language, to ensure relatability for the users. "
        f"The transcript is as given: {transcript_text} "
        f"Paragraph the text in a well-readable format. Leave one line space between each paragraph. Draw examples and instances from the source, mention them and work upon them."
        f"This data will be presented in a website, so normal spacing/bolding text will not work. Use <br> for line breaks and <p> for paragraphs. Make sure to add line breaks appropriately where needed."
        f"The summary should be precise and apt, and remember to silently and smartly account for some errors/unsensible things in the transcripts. "
        f"There can also be names of stars/movies/events/movements/etc. in the transcript which may not be written down in text properly, so "
        f"consult sources to fine-tune such discrepancies."
    )
    
    print("If you see this, Gemini prompt has worked!: ", response.text)
    return response.text


# New function to process direct article text:
def process_article_text(article_text):
    try:
        # Directly summarize article text without transcription
        summary = summarize_with_gemini(article_text)
        return summary

    except Exception as e:
        print(f"Error processing the article text: {e}")
        return str(e)
    

# Example usage: Call this function with a YouTube URL
if __name__ == "__main__":
    url = "https://youtube.com/shorts/Cl38Uz24p48?si=xxBpja_6M7GpMlVL"  # Example URL
    summary = " " # List the functions described above (or combine into one fn)
    print("Summary from Gemini API:")
    print(summary)
