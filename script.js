// Add Education Entry
document.getElementById('add-education').addEventListener('click', function () {
    const container = document.getElementById('education-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="School/University Name" class="education-institution" required>
        <input type="text" placeholder="Start Year" class="education-start" required>
        <input type="text" placeholder="End Year" class="education-end" required>
        <input type="text" placeholder="CGPA/Percentage" class="education-cgpa" required>
        <button type="button" class="remove-field">Remove Field</button>
    `;
    container.appendChild(newEntry);

    // Attach remove functionality to the new "Remove Field" button
    const removeButton = newEntry.querySelector('.remove-field');
    removeButton.addEventListener('click', function () {
        container.removeChild(newEntry);
    });
});

// Add Project Entry
document.getElementById('add-project').addEventListener('click', function () {
    const container = document.getElementById('projects-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('project-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Project Name" class="project-name" required>
        <input type="text" placeholder="Start Year" class="project-start" required>
        <input type="text" placeholder="End Year" class="project-end" required>
        <textarea placeholder="Project Description" class="project-description"></textarea>
        <button type="button" class="remove-field">Remove Field</button>
    `;
    container.appendChild(newEntry);

    // Attach remove functionality to the new "Remove Field" button
    const removeButton = newEntry.querySelector('.remove-field');
    removeButton.addEventListener('click', function () {
        container.removeChild(newEntry);
    });
});

// Add Experience Entry
document.getElementById('add-experience').addEventListener('click', function () {
    const container = document.getElementById('experience-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('experience-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Company Name" class="experience-company" required>
        <input type="text" placeholder="Job Title" class="experience-job-title" required>
        <input type="text" placeholder="Start Year" class="experience-start" required>
        <input type="text" placeholder="End Year" class="experience-end" required>
        <textarea placeholder="Job Description" class="experience-description"></textarea>
        <button type="button" class="remove-field">Remove Field</button>
    `;
    container.appendChild(newEntry);

    // Attach remove functionality to the new "Remove Field" button
    const removeButton = newEntry.querySelector('.remove-field');
    removeButton.addEventListener('click', function () {
        container.removeChild(newEntry);
    });
});

// Generate Resume
document.getElementById('generate-resume').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value.split(',');

    // Get Education Entries
    const educationEntries = document.querySelectorAll('.education-entry');
    const educationDetails = [];
    educationEntries.forEach(entry => {
        const institution = entry.querySelector('.education-institution').value;
        const start = entry.querySelector('.education-start').value;
        const end = entry.querySelector('.education-end').value;
        const cgpa = entry.querySelector('.education-cgpa').value;

        if (!institution || !start || !end || !cgpa) {
            alert("Please fill out all education fields!");
            return;
        }

        educationDetails.push({ institution, start, end, cgpa });
    });

    // Get Project Entries
    const projectEntries = document.querySelectorAll('.project-entry');
    const projectDetails = [];
    projectEntries.forEach(entry => {
        const projectName = entry.querySelector('.project-name').value;
        const start = entry.querySelector('.project-start').value;
        const end = entry.querySelector('.project-end').value;
        const description = entry.querySelector('.project-description').value;

        if (!projectName || !start || !end) {
            alert("Please fill out all project fields!");
            return;
        }

        projectDetails.push({ projectName, start, end, description });
    });

    // Get Experience Entries
    const experienceEntries = document.querySelectorAll('.experience-entry');
    const experienceDetails = [];
    experienceEntries.forEach(entry => {
        const company = entry.querySelector('.experience-company').value;
        const jobTitle = entry.querySelector('.experience-job-title').value;
        const start = entry.querySelector('.experience-start').value;
        const end = entry.querySelector('.experience-end').value;
        const jobDescription = entry.querySelector('.experience-description').value;

        if (!company || !jobTitle || !start || !end) {
            alert("Please fill out all experience fields!");
            return;
        }

        experienceDetails.push({ company, jobTitle, start, end, jobDescription });
    });

    // Check if any fields are missing
    if (!name || !email || !phone) {
        alert("Please fill out all required fields!");
        return;
    }

    // Generate Resume Content
    const resumeContent = `
        <h1>${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
        <h3>Education</h3>
        <ul>${educationDetails.map(edu => `
            <li><strong>${edu.institution}</strong> (${edu.start} - ${edu.end})
                <br><p>CGPA: ${edu.cgpa}</p>
            </li>`).join('')}</ul>
        <h3>Projects</h3>
        <ul>${projectDetails.map(project => `
            <li><strong>${project.projectName}</strong> (${project.start} - ${project.end})
                <br>${project.description}
            </li>`).join('')}</ul>
        <h3>Experience</h3>
        <ul>${experienceDetails.map(exp => `
            <li><strong>${exp.company}</strong> (${exp.start} - ${exp.end})
                <br><strong>${exp.jobTitle}</strong><br>${exp.jobDescription}
            </li>`).join('')}</ul>
    `;

    // Display the resume in preview
    const preview = document.getElementById('resume-preview');
    preview.className = ""; // Reset previous template class
    preview.innerHTML = resumeContent;

    const template = document.getElementById('template').value;
    if (template === 'classic') {
        preview.classList.add('template-classic');
    } else if (template === 'modern') {
        preview.classList.add('template-modern');
    }
});

// Download Resume as PDF
document.getElementById('download-resume').addEventListener('click', function () {
    const element = document.getElementById('resume-preview');
    
    // Ensure that the preview container has no padding, no borders, and a clean background
    element.style.padding = '0';
    element.style.border = 'none';
    element.style.backgroundColor = 'white';

    const opt = {
        margin: 0.5,  // Adjust this if you want some margin for the PDF
        filename: 'Resume.pdf',
        html2canvas: {
            scale: 2,
            backgroundColor: 'white',  // Ensures the background is white
            removeContainer: true, // Remove extra containers used by the preview layout
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait',
        }
    };

    // Generate the PDF from the element with the clean layout
    html2pdf().set(opt).from(element).save();
});
