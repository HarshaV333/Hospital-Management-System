from Config.flaskConfig import app, db

class Doctors(db.Model):
    __tablename__ = "doctors_table"
    doc_id = db.Column(db.Integer, primary_key=True)
    doc_name = db.Column(db.String(50), nullable=False)
    doc_specialization = db.Column(db.String(100), nullable=False)
    # relationship to access appointments of this doctor
    appointments = db.relationship("Appointments", backref="doctor", lazy=True)

    def to_json(self):
        return {
            "doc_id": self.doc_id,
            "doc_name": self.doc_name,
            "doc_specialization": self.doc_specialization
        }
    

class Patients(db.Model):
    __tablename__ = "patients_table"
    pat_id = db.Column(db.Integer, primary_key=True)
    pat_name = db.Column(db.String(50), nullable=False)
    pat_age = db.Column(db.Integer, nullable=False)
    pat_gender = db.Column(db.String(50), nullable=False)
    # relationship to access appointments of this patient
    appointments = db.relationship("Appointments", backref="patient", lazy=True)

    def to_json(self):
        return {
            "pat_id": self.pat_id,
            "pat_name": self.pat_name,
            "pat_age": self.pat_age,
            "pat_gender": self.pat_gender
        }
    

class Appointments(db.Model):
    __tablename__ = "appointments_table"
    appoint_id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors_table.doc_id"), nullable=False)
    doctor_name = db.Column(db.String(50), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients_table.pat_id"), nullable=False)
    patient_name = db.Column(db.String(50), nullable=False)
    appoint_date = db.Column(db.Date, nullable=False)

    def to_json(self):
        return {
            "appoint_id": self.appoint_id,
            "doctor_id": self.doctor_id,
            "doctor_name": self.doctor_name,
            "patient_id": self.patient_id,
            "patient_name": self.patient_name,
            "appoint_date": self.appoint_date
        }