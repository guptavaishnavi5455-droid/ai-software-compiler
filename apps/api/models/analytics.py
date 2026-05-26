from sqlalchemy import Column, String, Integer, DateTime, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Analytics(Base):
    __tablename__ = "analytics"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    total_contacts = Column(Integer, default=0)
    contacts_added_today = Column(Integer, default=0)
    active_sessions = Column(Integer, default=0)
    last_login = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    class Config:
        from_attributes = True

class SystemAnalytics(Base):
    __tablename__ = "system_analytics"
    
    id = Column(String, primary_key=True, index=True)
    total_users = Column(Integer, default=0)
    premium_users = Column(Integer, default=0)
    total_contacts = Column(Integer, default=0)
    total_revenue = Column(Float, default=0.0)
    date = Column(DateTime, default=datetime.utcnow, index=True)
    
    class Config:
        from_attributes = True
