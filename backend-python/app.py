from flask import Flask, request, jsonify, session, Response
from flask_cors import CORS
from main_aggregate import download_audio, transcribe_with_progress, summarize_with_gemini, process_article_text
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.secret_key = os.getenv("SECRET_KEY")

# Handle OPTIONS requests before they reach other route logic
@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

@app.route('/process', methods=['POST'])
def process_request():
    data = request.json
    
    if 'url' in data:
        url = request.json['url']
        download_audio(url)
        transcription = transcribe_with_progress("audio.mp3")
        
        if not transcription:
            return jsonify({"error": "Failed to transcribe the audio"}), 500
        
        summary = summarize_with_gemini(transcription)
    
    elif "text" in data:
        article_text = request.json.get('text')
        summary = process_article_text(article_text)
    
    else:
        return jsonify({"error": "No valid input provided."}), 400
    
    session['summary'] = summary
    session['video_url'] = url if 'url' in data else None
    session.modified = True

    print(f"Session content: {session}")
    return jsonify({"message": "Gemini summarized it", "summary": summary})

@app.route('/results', methods=['GET'])
def get_results():
    summary = session.get('summary', "No summary available.")
    print(f"Session content (results): {session}")
    return jsonify({"summary": summary})

@app.route('/some-route', methods=['POST'])
def save_summary_to_session():
    summary = request.json.get('summary')
    session['summary'] = summary  # Save summary to session
    return jsonify({"message": "Summary saved to session!"})

if __name__ == '__main__':
    app.run(debug=True)
