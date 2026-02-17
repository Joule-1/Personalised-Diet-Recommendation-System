import React, { useState } from "react";
import Select from 'react-select'
import { dietTypeOptions } from "../utils/options/dietType_options";
import { activityLevelOptions } from "../utils/options/activityLevel_options";
import { healthConditionOptions } from "../utils/options/healthCondition_options";

const UserPreferencesCollector = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    const [diet, setDiet] = useState(false);
    const [activityLevel, setActivityLevel] = useState(false);
    const [conditions, setConditions] = useState([]);
   console.log(diet, activityLevel, conditions)

   const handleConditionsDropdownChange = (selected) => {
        if(conditions.lenght <= 3)
            setConditions(selected)
   }

    return(
        <section className="flex">
            <div className="flex-2 border">

            </div>
            <div className="flex-4 flex border items-center flex-col">
                <div className="flex place-content-evenly w-full">
                    <Select placeholder="Diet Preferences*" value={diet} onChange={(selected) => (setDiet(selected))} className="w-[250px]" options={dietTypeOptions} />
                    <Select placeholder="Activity Level*" value={activityLevel} onChange={(selected) => (setActivityLevel(selected))} className="w-[250px]" options={activityLevelOptions} />                    
                </div>
                <div>
                    <Select placeholder="Conditions*" isOptionDisabled={() =>
    conditions.length >= 3
  } isMulti value={conditions} onChange={(selected) => {
    if (!selected || selected.length <= 3) {
      setConditions(selected);
    }
  }} className="w-[250px]" options={healthConditionOptions} />
                </div>
                <button onClick={handleSubmit} className="py-2 cursor-pointer text-white bg-green-700 hover:text-green-700 poppins-semibold hover:bg-white hover:border-bg-green-700 px-4 border-4 rounded-xl">Submit</button>
            </div>
            <div className="flex-3 border">bf</div>
            
        </section>
    );
};

export default UserPreferencesCollector;
