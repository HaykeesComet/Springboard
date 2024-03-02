from flask import Flask, render_template, url_for, request, redirect
import csv

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/<string:page_name>")
def html_page(page_name):
    return render_template(page_name)

def write_to_file(data):
    with open('database.txt', mode = 'a') as database:
        email = data['email']
        subject = data['subject']
        message = data['message']
        file = database.write(f"\nEmail: {email}\nSubject: {subject}\nMessage: {message}\n*********************************************")

def write_to_csv(data):
    with open('database.csv', newline = '', mode = 'a') as database2:
        email = data['email']
        subject = data['subject']
        message = data['message']
        csv_file = csv.writer(database2, delimiter = ',', quotechar = '|', quoting = csv.QUOTE_MINIMAL)
        csv_file.writerow([email,subject,message])

@app.route("/submit_form", methods=["POST", "GET"])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.form.to_dict()
            print(data)
            write_to_file(data)
            write_to_csv(data)
            return redirect('/thankyou.html')
        except:
            return 'Database Error!'
    else:
        return 'Form Error! Please try again.'

# @app.route("/about.html")
# def about():
#     return render_template('about.html')

# @app.route("/components.html")
# def components():
#     return render_template('components.html')

# @app.route("/contact.html")
# def contact():
#     return render_template('contact.html')

# @app.route("/thankyou.html")
# def thankyou():
#     return render_template('thankyou.html')

# @app.route("/work.html")
# def work():
#     return render_template('work.html')

# @app.route("/works.html")
# def works():
#     return render_template('works.html')

# @app.route("/<username>/<int:post_id>")
# def main(username = None, post_id = None):
#     return render_template('index.html', name = username, pid = post_id)

# @app.route("/favicon")
# def favicon():
#     return 'pass'

# @app.route("/hello")
# def hello():
#     return 'Hello there!'