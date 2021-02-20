import psycopg2
from psycopg2 import Error


user = "postgres"
password = "postgres"
host = "localhost"
port = "5433"
database = "CookingPlatform"


try:
    # Connect to an existing database
    connection = psycopg2.connect(user=user, password=password, host=host, port=port, database=database)

    # Create a cursor to perform database operations
    cursor = connection.cursor()
    # Print PostgreSQL details
    print("PostgreSQL server information")
    print(connection.get_dsn_parameters(), "\n")
    # Executing a SQL query
    cursor.execute("SELECT version();")
    # Fetch result
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

    select_query = "SELECT * FROM User"
    cursor.execute(select_query)
    connection.commit()
    # Fetch result
    cursor.execute("SELECT * from User")
    record = cursor.fetchall()
    print("Result ", record)

except (Exception, Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")


def select(connection, cursor, table: str):
    select_query = f"SELECT * FROM {table}"
    cursor.execute(select_query)
    connection.commit()
    print("1 Record inserted successfully")
    # Fetch result
    cursor.execute("SELECT * from User")
    record = cursor.fetchall()
    print("Result ", record)