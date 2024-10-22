from flask import Flask, request, jsonify, render_template
import os  # Required for deployment

app = Flask(__name__)

# Sample data and user management
users = {}
mood_data = {}
resources = [
    {"id": 1, "title": "Meditation Basics", "content": "Learn how to meditate effectively."},
    {"id": 2, "title": "Coping Strategies", "content": "Tips for dealing with anxiety."}
]
counselor_availability = {"available": True}
crisis_hotlines = [
    {"country": "India", "number": "9152987821"},
    {"country": "USA", "number": "1-800-273-TALK"}
]
reminders = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resources', methods=['GET'])
def get_resources():
    return jsonify(resources), 200

@app.route('/resources/<int:id>', methods=['GET'])
def get_resource_by_id(id):
    resource = next((res for res in resources if res['id'] == id), None)
    if resource:
        return jsonify(resource), 200
    return jsonify({"message": "Resource not found!"}), 404

@app.route('/counselor/connect', methods=['POST'])
def connect_with_counselor():
    data = request.get_json()
    email = data.get('email')
    if email in users:
        return jsonify({"message": "Chat initiated with a mental health counselor."}), 200
    return jsonify({"message": "User not found!"}), 404

@app.route('/counselor/availability', methods=['GET'])
def check_counselor_availability():
    return jsonify(counselor_availability), 200

@app.route('/counselor/session', methods=['POST'])
def book_counselor_session():
    data = request.get_json()
    email = data.get('email')
    session_type = data.get('session_type', 'chat')
    if email in users:
        return jsonify({
            "message": "Counselor session booked successfully!",
            "session_type": session_type
        }), 201
    return jsonify({"message": "User not found!"}), 404

@app.route('/crisis/help', methods=['POST'])
def trigger_crisis_alert():
    data = request.get_json()
    email = data.get('email')
    if email in users:
        return jsonify({"message": "Crisis intervention team alerted!"}), 200
    return jsonify({"message": "User not found!"}), 404

@app.route('/crisis/hotlines', methods=['GET'])
def get_crisis_hotlines():
    return jsonify(crisis_hotlines), 200

@app.route('/notifications/reminders', methods=['POST'])
def set_reminder():
    data = request.get_json()
    email = data.get('email')
    reminder = data.get('reminder')

    if email not in reminders:
        reminders[email] = []
    
    reminders[email].append(reminder)
    return jsonify({"message": "Reminder set successfully!"}), 201

@app.route('/notifications/schedule', methods=['GET'])
def get_reminders():
    email = request.args.get('email')
    if email in reminders:
        return jsonify(reminders[email]), 200
    return jsonify({"message": "No reminders found!"}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
