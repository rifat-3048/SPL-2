import React, { useState } from "react";
import bulb from "../assets/images/bulb.png";
const DiseaseChecker = () => {
  const diseaseMapping = {
    Fever: ["Flu", "Malaria", "COVID-19", "Dengue"],
    Cough: ["Bronchitis", "Pneumonia", "COVID-19","Common Cold"],
    Headache: ["Migraine", "Tension Headache", "Sinusitis", "Stress"],
    Nausea: ["Food Poisoning", "Pregnancy", "Gastritis"],
    Fatigue: ["Anemia", "Thyroid Disorder", "Chronic Fatigue Syndrome"],
    ChestPain: ["Heart Attack", "Angina", "Pneumonia", "Costochondritis"],
    ShortnessOfBreath: ["Asthma", "COPD", "COVID-19", "Pneumonia"],
    AbdominalPain: ["Gastritis", "Appendicitis", "Food Poisoning", "IBS"],
    Vomiting: ["Food Poisoning", "Pregnancy", "Gastroenteritis"],
    Diarrhea: ["Food Poisoning", "IBS", "Gastroenteritis"],
    SoreThroat: ["Tonsillitis", "Common Cold", "Strep Throat"],
    SwollenLymphNodes: ["Mononucleosis", "Tonsillitis", "Lymphoma"],
  };

  const medicines = {
    Flu: "Paracetamol, Antihistamines, and Rest.",
    Malaria: "Chloroquine, Artemisinin-based Combination Therapy (ACT).",
    "COVID-19": "Antiviral Drugs, Oxygen Therapy, and Supportive Care.",
    Dengue: "Paracetamol, Fluid Management, and Electrolyte Solutions.",
    "Common Cold": "Decongestants, Cough Syrup, and Rest.",
    Bronchitis: "Antibiotics (if bacterial), Cough Suppressants.",
    Pneumonia: "Antibiotics, Oxygen Therapy, and Rest.",
    Migraine: "Painkillers (Ibuprofen, Acetaminophen), Hydration.",
    "Tension Headache": "Relaxation Therapy, Painkillers.",
    Sinusitis: "Decongestants, Nasal Sprays, Antibiotics.",
    Stress: "Relaxation Techniques, Therapy, and Pain Relief.",
    Anemia: "Iron Supplements, Vitamin B12.",
    "Thyroid Disorder": "Thyroid Medication, Diet Control.",
    "Chronic Fatigue Syndrome":
      "Exercise, Sleep Management, Medication for Pain.",
    "Heart Attack": "Aspirin, Beta-Blockers, Surgery.",
    Angina: "Nitrates, Beta-Blockers, Statins.",
    Costochondritis: "Anti-inflammatory Drugs, Pain Management.",
    Asthma: "Inhalers, Steroids, Bronchodilators.",
    COPD: "Oxygen Therapy, Bronchodilators, Steroids.",
    Appendicitis: "Surgical Removal of Appendix.",
    IBS: "Dietary Changes, Antispasmodics, Fiber Supplements.",
    "Food Poisoning": "Hydration, Antibiotics if Necessary.",
    Pregnancy: "Prenatal Vitamins, Healthy Diet.",
    Gastritis: "Antacids, Proton Pump Inhibitors.",
    Gastroenteritis: "Hydration, Electrolyte Solutions.",
    Tonsillitis: "Antibiotics, Pain Relievers.",
    "Strep Throat": "Antibiotics, Pain Relievers.",
    Mononucleosis: "Rest, Pain Relief, Hydration.",
    Lymphoma: "Chemotherapy, Radiation Therapy.",
  };

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [suggestedMedicine, setSuggestedMedicine] = useState("");

  const symptomsList = Object.keys(diseaseMapping);

  const handleSubmit = (e) => {
    e.preventDefault();

    const diseaseScores = {};

    selectedSymptoms.forEach((symptom) => {
      if (diseaseMapping[symptom]) {
        diseaseMapping[symptom].forEach((disease) => {
          diseaseScores[disease] = (diseaseScores[disease] || 0) + 1;
        });
      }
    });

    if (age < 18) {
      if (diseaseScores["Flu"]) diseaseScores["Flu"] += 1;
    }
    if (gender === "Female") {
      if (diseaseScores["Pregnancy"]) diseaseScores["Pregnancy"] += 1;
    }

    const mostLikelyDisease = Object.keys(diseaseScores).reduce((a, b) =>
      diseaseScores[a] > diseaseScores[b] ? a : b
    );

    setPredictedDisease(
      mostLikelyDisease || "No disease predicted. Please select more symptoms."
    );
    setSuggestedMedicine(medicines[mostLikelyDisease] || "No medicines found.");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-50 to-teal-100 py-6">
      {/* Header Section */}
      <header className="text-center mb-8">
        <p className="mt-2 text-lg text-teal-600">
          Identify probable diseases and suggested doctors based on symptoms.
        </p>
      </header>

      <div className="flex justify-center items-start w-full max-w-6xl space-x-12">
        {/* Form Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-teal-700 mb-6">
            Enter Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block font-medium text-teal-700">Age</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border-2 p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-teal-700">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border-2 p-2 rounded-lg"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium text-teal-700">
                Select Symptoms
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {symptomsList.map((symptom) => (
                  <label key={symptom} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={symptom}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedSymptoms((prev) =>
                          prev.includes(value)
                            ? prev.filter((s) => s !== value)
                            : [...prev, value]
                        );
                      }}
                      className="mr-2"
                    />
                    {symptom}
                  </label>
                ))}
              </div>
            </div>
            <button className="block bg-blue-600 text-white px-6 py-2 rounded-lg mx-auto">
              Check Disease
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="flex-1">
          {predictedDisease && (
            <div className="p-6 bg-red-600 text-white rounded-lg mb-6">
              <h3 className="text-xl font-bold">Predicted Disease:</h3>
              <p>{predictedDisease}</p>
            </div>
          )}
          {suggestedMedicine && (
            <div className="flex items-center space-x-4">
              {/* Bulb Image */}
              <img
                src={bulb} // Replace with the actual path or URL to your bulb image
                alt="Bulb"
                className="w-40 h-40 object-contain"
              />
              {/* Medicine Suggestions */}
              <div className="pp-4 bg-green-400 text-black rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Suggested Medicines:</h3>
                <p>{suggestedMedicine}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-teal-600 text-center">
        <p>Disclaimer: This tool is for informational purposes only.</p>
        <p>Please consult a medical professional for accurate diagnosis.</p>
      </footer>
    </div>
  );
};

export default DiseaseChecker;