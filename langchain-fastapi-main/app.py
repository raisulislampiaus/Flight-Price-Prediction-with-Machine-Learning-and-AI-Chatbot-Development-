from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine
from langchain.agents import create_sql_agent
from langchain.sql_database import SQLDatabase
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain_groq import ChatGroq
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import sqlite3
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()






app = FastAPI()
# Allow requests from the React app on localhost:3000
origins = [
    "http://localhost:3000",  # Your React Native local server
    "http://127.0.0.1:3000",  # Another way React Native might be accessed
    "*",  # Allow all domains (use this carefully in production)
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Constants
LOCALDB = "USE_LOCALDB"
MYSQL = "USE_MYSQL"


class QueryModel(BaseModel):
    query: str
    db_uri: str
    mysql_host: str = None
    mysql_user: str = None
    mysql_password: str = None
    mysql_db: str = None


def configure_db(db_uri, mysql_host=None, mysql_user=None, mysql_password=None, mysql_db=None):
    if db_uri == LOCALDB:
        dbfilepath = (Path(__file__).parent / "flight_data.db").absolute()
        creator = lambda: sqlite3.connect(f"file:{dbfilepath}?mode=ro", uri=True)
        return SQLDatabase(create_engine("sqlite:///", creator=creator))
    elif db_uri == MYSQL:
        if not (mysql_host and mysql_user and mysql_password and mysql_db):
            raise HTTPException(status_code=400, detail="MySQL connection details missing")
        return SQLDatabase(create_engine(f"mysql+mysqlconnector://{mysql_user}:{mysql_password}@{mysql_host}/{mysql_db}"))


@app.post("/chat")
async def chat_with_db(query: QueryModel):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="No valid API key provided.")

    # LLM model initialization
    llm = ChatGroq(groq_api_key=api_key, model_name="Llama3-8b-8192", streaming=True)

    # Database connection
    db = configure_db(query.db_uri, query.mysql_host, query.mysql_user, query.mysql_password, query.mysql_db)

    # Toolkit and agent setup
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    agent = create_sql_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True,
        agent_type="zero-shot-react-description"
    )

    response = agent.run(query.query)
    return {"response": response}
