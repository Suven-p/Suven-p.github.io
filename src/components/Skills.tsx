import React from 'react';

const SkillCard = ({ skillName, icon }) => {
    if (icon === null) {
        icon = `https://skillicons.dev/icons?i=${skillName.toLowerCase()}`;
    }
    console.log(skillName, icon);
    return (
        <div className='inline-flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4'>
            <img src={icon} alt={skillName} className='w-16 h-16' />
            <p className='text-center text-white'>{skillName}</p>
        </div>
    );
};

const Skills = ({ skills }) => {
    return (
        <>
            <h1></h1>
            {skills.map((skill) => {
                const skillName = Array.isArray(skill) ? skill[0] : skill;
                const icon = Array.isArray(skill) ? skill[1] : null;
                return <SkillCard skillName={skillName} icon={icon} />;
            })}
        </>
    );
};

export default Skills;
