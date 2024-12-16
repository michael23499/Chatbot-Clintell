import time
import psycopg2
from django.core.management import execute_from_command_line

def wait_for_db():
    while True:
        try:
            conn = psycopg2.connect(
                dbname='chatbot_db',
                user='chatbot_user',
                password='password',
                host='localhost',
                port='5432'
            )
            conn.close()
            break
        except psycopg2.OperationalError:
            print("Esperando a que la base de datos esté lista...")
            time.sleep(5)

if __name__ == "__main__":
    wait_for_db()
    execute_from_command_line(['manage.py', 'migrate'])
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])
