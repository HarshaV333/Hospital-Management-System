from flask import request, jsonify
from Config.flaskConfig import app, db
from Models.modelCreate import Doctors, Patients, Appointments

# Add Doctor
@app.route("/addDoctor", methods=["POST"])
def addDoctor():
    # get data from user
    name = request.json.get("doc_name")
    specialization = request.json.get("doc_specialization")

    if not name or not specialization:
        return jsonify({"message": "Name or Specialization is Missing"}), 400
    
    # create a new user
    new_doctor = Doctors(doc_name = name, doc_specialization = specialization)

    try:
        # add user to session and commit to database
        db.session.add(new_doctor)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    return jsonify({"message": "Doctor Added Successfully"}), 200


# Delete Doctor
@app.route("/deleteDoctor/<int:doctor_id>", methods=["DELETE"])
def deleteDoctor(doctor_id):
    doctor = Doctors.query.get(doctor_id)
    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404
    
    try:
        # delete doctor
        db.session.delete(doctor)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    return jsonify({"message": f"{doctor} deleted Successfully"}), 200


# Add Patient
@app.route("/addPatient", methods=["POST"])
def addPatient():
    # get data from user
    name = request.json.get("pat_name")
    age = request.json.get("pat_age")
    gender = request.json.get("pat_gender")

    if not name or not age or not gender:
        return jsonify({"message": "Name or Age or Gender is Missing"}), 400
    
    # create a new user
    new_patient = Patients(pat_name = name, pat_age = age, pat_gender = gender)

    try:
        # add user to session and commit to database
        db.session.add(new_patient)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    return jsonify({"message": "Patient Added Successfully"}), 200


# Delete Patient
@app.route("/deletePatient/<int:patient_id>", methods=["DELETE"])
def deletePatient(patient_id):
    patient = Patients.query.get(patient_id)
    if not patient:
        return jsonify({"message": "Patient not found"}), 404
    
    try:
        # delete doctor
        db.session.delete(patient)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    return jsonify({"message": f"{patient} deleted Successfully"}), 200


# Book Appointment
@app.route("/bookAppointment/<int:doctor_id>/<int:patient_id>", methods=["POST"])
def bookAppointment(doctor_id, patient_id):
    doctor = Doctors.query.filter_by(doc_id = doctor_id).first()
    patient = Patients.query.filter_by(pat_id = patient_id).first()

    print(doctor)
    print(patient)

    date = request.json.get("date")
    if not date:
        return jsonify({"message": "Please enter date"}), 400
    
    # create appointment
    new_appoint = Appointments(doctor_id = doctor_id, doctor_name = doctor.doc_name, patient_id = patient_id, 
                               patient_name = patient.pat_name, appoint_date = date)

    try:
        # add appointment to session and commit to database
        db.session.add(new_appoint)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400

    return jsonify({"message": "Appointment Created Successfully"}), 200


# Delete Appointment
@app.route("/deleteAppointment/<int:appoint_id>", methods=["DELETE"])
def deleteAppointment(appoint_id):
    appoint = Appointments.query.get(appoint_id)

    if not appoint:
        return jsonify({"message": "Appointment doesn't exists"})
    
    try:
        # delete appointment
        db.session.delete(appoint)
        db.session.commit()
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
    return jsonify({"message": "Appointment deleted Successfully"}), 200

# Get All Doctors with their ids
@app.route("/getDoctors", methods=["GET"])
def getDoctors():
    allDoctors = Doctors.query.with_entities(Doctors.doc_id, Doctors.doc_name, Doctors.doc_specialization)

    if not allDoctors:
        return jsonify({"message": "No Doctors Found"}), 400
    
    # fetch all users
    try:
        doctor_list = [{"doc_id": doctor.doc_id, "doc_name": doctor.doc_name, "doc_specialization": doctor.doc_specialization} 
                        for doctor in allDoctors] # used to get specific columns

    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
    return jsonify({"allDoctors": doctor_list}), 200

# Get All Patients with their ids
@app.route("/getPatients", methods=["GET"])
def getPatients():
    allPatients = Patients.query.with_entities(Patients.pat_id, Patients.pat_name)
    print(allPatients)

    if not allPatients:
        return jsonify({"message": "No Patients Found"}), 400
    
    try:
        patients_list = [{"pat_id": patient.pat_id, "pat_name":patient.pat_name} for patient in allPatients] # this is used for specific columns
    except Exception as e:
        return jsonify({"Error": str(e)}), 400
    
    return jsonify({"patients": patients_list}), 200

# Get all Appointments
@app.route("/getAppointments", methods=["GET"])
def getAppointments():
    appointments = Appointments.query.with_entities(Appointments.appoint_id, Appointments.doctor_name, 
                                                    Appointments.patient_name, Appointments.appoint_date)
    
    if not appointments:
        return jsonify({"message": "No Appointments Available"}), 400

    try:
        appointments_list = [
            {
                "appoint_id": appoint.appoint_id,
                "doctor_name": appoint.doctor_name,
                "patient_name": appoint.patient_name,
                "appoint_date": appoint.appoint_date.strftime('%Y-%m-%d') # the strftime removes time from date
            } 
            for appoint in appointments]
    except Exception as e:
        return jsonify({"Error", str(e)}), 400
    
    return jsonify({"appointments": appointments_list}), 200


if __name__ == "__main__":
    with app.app_context():
        # creates all tables
        db.create_all()

    app.run(debug=True)