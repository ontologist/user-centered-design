// Persona Builder JavaScript
// Handles photo upload, form validation, preview, and PDF generation

let uploadedPhotoData = null;

// ========================================
// Photo Upload Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const photoUploadArea = document.getElementById('photoUploadArea');
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const removePhotoBtn = document.getElementById('removePhoto');

    // Click to upload
    photoUploadArea.addEventListener('click', function(e) {
        if (e.target !== removePhotoBtn && !e.target.closest('.btn-remove')) {
            photoInput.click();
        }
    });

    // File input change
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handlePhotoUpload(file);
        }
    });

    // Drag and drop functionality
    photoUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        photoUploadArea.classList.add('drag-over');
    });

    photoUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        photoUploadArea.classList.remove('drag-over');
    });

    photoUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        photoUploadArea.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handlePhotoUpload(files[0]);
        }
    });

    // Remove photo
    removePhotoBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removePhoto();
    });

    function handlePhotoUpload(file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPG, PNG, GIF)');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Read and display the image
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhotoData = e.target.result;
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            removePhotoBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    function removePhoto() {
        uploadedPhotoData = null;
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
        removePhotoBtn.style.display = 'none';
        photoInput.value = '';
    }

    // ========================================
    // Form Handling
    // ========================================

    const form = document.getElementById('personaForm');
    const previewBtn = document.getElementById('previewBtn');
    const generatePdfBtn = document.getElementById('generatePdfBtn');

    // Preview functionality
    previewBtn.addEventListener('click', function() {
        if (validateForm()) {
            generatePreview();
            document.getElementById('previewSection').style.display = 'block';
            document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // PDF generation
    generatePdfBtn.addEventListener('click', function() {
        if (validateForm()) {
            generatePDF();
        }
    });

    // Form reset
    form.addEventListener('reset', function() {
        removePhoto();
        document.getElementById('previewSection').style.display = 'none';
    });

    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.focus();
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields (marked with *)');
        }

        return isValid;
    }

    // ========================================
    // Preview Generation
    // ========================================

    function generatePreview() {
        const formData = getFormData();
        const previewHtml = createPreviewHTML(formData);
        document.getElementById('personaPreview').innerHTML = previewHtml;
    }

    function getFormData() {
        // Get all form values
        const data = {
            photo: uploadedPhotoData,
            name: document.getElementById('personaName').value,
            role: document.getElementById('personaRole').value,
            type: document.getElementById('personaType').value,
            quote: document.getElementById('personaQuote').value,
            ageRange: document.getElementById('ageRange').value,
            tenure: document.getElementById('tenure').value,
            department: document.getElementById('department').value,
            location: document.getElementById('location').value,
            techLevel: document.querySelector('input[name="techLevel"]:checked')?.value || 'medium',
            goals: [
                document.getElementById('goal1').value,
                document.getElementById('goal2').value,
                document.getElementById('goal3').value
            ].filter(g => g),
            motivations: document.getElementById('motivations').value,
            painPoints: [
                {
                    point: document.getElementById('pain1').value,
                    quote: document.getElementById('pain1Quote').value
                },
                {
                    point: document.getElementById('pain2').value,
                    quote: document.getElementById('pain2Quote').value
                },
                {
                    point: document.getElementById('pain3').value,
                    quote: document.getElementById('pain3Quote').value
                }
            ].filter(p => p.point),
            infoSources: Array.from(document.querySelectorAll('input[name="infoSources"]:checked')).map(cb => cb.value),
            commChannels: Array.from(document.querySelectorAll('input[name="commChannels"]:checked')).map(cb => cb.value),
            behaviors: document.getElementById('behaviors').value,
            needs: [
                document.getElementById('need1').value,
                document.getElementById('need2').value,
                document.getElementById('need3').value
            ].filter(n => n),
            successCriteria: document.getElementById('successCriteria').value,
            scenarios: [
                document.getElementById('scenario1').value,
                document.getElementById('scenario2').value,
                document.getElementById('scenario3').value
            ].filter(s => s),
            interviewCount: document.getElementById('interviewCount').value,
            researchMethods: Array.from(document.querySelectorAll('input[name="researchMethods"]:checked')).map(cb => cb.value),
            researchNotes: document.getElementById('researchNotes').value
        };

        return data;
    }

    function createPreviewHTML(data) {
        let html = '<div class="persona-preview-content">';

        // Header with photo
        html += '<div class="preview-header">';
        if (data.photo) {
            html += `<img src="${data.photo}" alt="${data.name}" class="preview-photo">`;
        }
        html += '<div class="preview-header-info">';
        html += `<h2>${data.name}</h2>`;
        html += `<p class="preview-role">${data.role}</p>`;
        html += `<p class="preview-type">${formatPersonaType(data.type)}</p>`;
        html += '</div></div>';

        // Quote
        if (data.quote) {
            html += `<div class="preview-quote">"${data.quote}"</div>`;
        }

        // Demographics
        html += '<div class="preview-section"><h3>Demographics</h3><ul>';
        if (data.ageRange) html += `<li><strong>Age:</strong> ${data.ageRange}</li>`;
        if (data.tenure) html += `<li><strong>Tenure:</strong> ${data.tenure}</li>`;
        if (data.department) html += `<li><strong>Department:</strong> ${data.department}</li>`;
        if (data.location) html += `<li><strong>Work Location:</strong> ${data.location}</li>`;
        html += `<li><strong>Technical Proficiency:</strong> ${formatTechLevel(data.techLevel)}</li>`;
        html += '</ul></div>';

        // Goals
        if (data.goals.length > 0) {
            html += '<div class="preview-section"><h3>Goals & Motivations</h3><ul>';
            data.goals.forEach(goal => {
                html += `<li>${goal}</li>`;
            });
            html += '</ul>';
            if (data.motivations) {
                html += `<p>${data.motivations}</p>`;
            }
            html += '</div>';
        }

        // Pain Points
        if (data.painPoints.length > 0) {
            html += '<div class="preview-section"><h3>Pain Points & Frustrations</h3>';
            data.painPoints.forEach(pain => {
                html += `<div class="pain-point"><strong>${pain.point}</strong>`;
                if (pain.quote) {
                    html += `<blockquote>"${pain.quote}"</blockquote>`;
                }
                html += '</div>';
            });
            html += '</div>';
        }

        // Behaviors
        html += '<div class="preview-section"><h3>Behaviors & Preferences</h3>';
        if (data.infoSources.length > 0) {
            html += '<p><strong>Current HR Information Sources:</strong></p><ul>';
            data.infoSources.forEach(source => {
                html += `<li>${source}</li>`;
            });
            html += '</ul>';
        }
        if (data.commChannels.length > 0) {
            html += '<p><strong>Preferred Communication Channels:</strong></p><ul>';
            data.commChannels.forEach(channel => {
                html += `<li>${channel}</li>`;
            });
            html += '</ul>';
        }
        if (data.behaviors) {
            html += `<p><strong>Observed Behaviors:</strong></p><p>${data.behaviors}</p>`;
        }
        html += '</div>';

        // Needs from HR AI
        if (data.needs.length > 0) {
            html += '<div class="preview-section"><h3>Needs from HR AI Assistant</h3><ul>';
            data.needs.forEach(need => {
                html += `<li>${need}</li>`;
            });
            html += '</ul>';
            if (data.successCriteria) {
                html += `<p><strong>Success Criteria:</strong> ${data.successCriteria}</p>`;
            }
            html += '</div>';
        }

        // Scenarios
        if (data.scenarios.length > 0) {
            html += '<div class="preview-section"><h3>Use Case Scenarios</h3>';
            data.scenarios.forEach((scenario, index) => {
                html += `<p><strong>Scenario ${index + 1}:</strong> ${scenario}</p>`;
            });
            html += '</div>';
        }

        // Research validation
        html += '<div class="preview-section preview-research">';
        html += '<h3>Research Validation</h3>';
        html += `<p><strong>Interviews Conducted:</strong> ${data.interviewCount}</p>`;
        if (data.researchMethods.length > 0) {
            html += '<p><strong>Research Methods:</strong> ' + data.researchMethods.join(', ') + '</p>';
        }
        if (data.researchNotes) {
            html += `<p><strong>Notes:</strong> ${data.researchNotes}</p>`;
        }
        html += '</div>';

        html += '</div>';
        return html;
    }

    function formatPersonaType(type) {
        const types = {
            'employee': 'General Employee',
            'manager': 'Manager',
            'hr-admin': 'HR Administrator',
            'executive': 'Executive/Leadership',
            'other': 'Other'
        };
        return types[type] || type;
    }

    function formatTechLevel(level) {
        const levels = {
            'low': 'Low (Not comfortable with technology)',
            'medium': 'Medium (Average technical skills)',
            'high': 'High (Very tech-savvy)'
        };
        return levels[level] || level;
    }

    // ========================================
    // PDF Generation
    // ========================================

    function generatePDF() {
        const formData = getFormData();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        let yPosition = margin;

        // Header with gradient background simulation
        doc.setFillColor(37, 99, 235); // Primary blue
        doc.rect(0, 0, pageWidth, 50, 'F');

        // Add photo if available
        if (formData.photo) {
            try {
                doc.addImage(formData.photo, 'JPEG', margin, yPosition, 40, 40);
            } catch (e) {
                console.error('Error adding image to PDF:', e);
            }
        }

        // Persona name and role
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        const nameX = formData.photo ? margin + 50 : margin;
        doc.text(formData.name, nameX, yPosition + 15);

        doc.setFontSize(14);
        doc.setFont(undefined, 'normal');
        doc.text(formData.role, nameX, yPosition + 25);

        doc.setFontSize(12);
        doc.text(formatPersonaType(formData.type), nameX, yPosition + 33);

        yPosition = 60;

        // Reset text color for body
        doc.setTextColor(0, 0, 0);

        // Quote
        if (formData.quote) {
            yPosition = checkPageBreak(doc, yPosition, 20);
            doc.setFillColor(219, 234, 254); // Light blue
            const quoteHeight = 15;
            doc.rect(margin, yPosition, contentWidth, quoteHeight, 'F');
            doc.setFontSize(11);
            doc.setFont(undefined, 'italic');
            doc.text('"' + formData.quote + '"', margin + 5, yPosition + 10, { maxWidth: contentWidth - 10 });
            doc.setFont(undefined, 'normal');
            yPosition += quoteHeight + 10;
        }

        // Demographics
        yPosition = addSection(doc, 'Demographics', yPosition, pageHeight, margin, contentWidth);
        const demographics = [];
        if (formData.ageRange) demographics.push(`Age: ${formData.ageRange}`);
        if (formData.tenure) demographics.push(`Tenure: ${formData.tenure}`);
        if (formData.department) demographics.push(`Department: ${formData.department}`);
        if (formData.location) demographics.push(`Location: ${formData.location}`);
        demographics.push(`Technical Proficiency: ${formatTechLevel(formData.techLevel)}`);
        yPosition = addBulletList(doc, demographics, yPosition, pageHeight, margin, contentWidth);

        // Goals & Motivations
        if (formData.goals.length > 0) {
            yPosition = addSection(doc, 'Goals & Motivations', yPosition, pageHeight, margin, contentWidth);
            yPosition = addBulletList(doc, formData.goals, yPosition, pageHeight, margin, contentWidth);
            if (formData.motivations) {
                yPosition = checkPageBreak(doc, yPosition, 20);
                const splitMotivations = doc.splitTextToSize(formData.motivations, contentWidth - 5);
                doc.text(splitMotivations, margin + 5, yPosition);
                yPosition += splitMotivations.length * 5 + 5;
            }
        }

        // Pain Points
        if (formData.painPoints.length > 0) {
            yPosition = addSection(doc, 'Pain Points & Frustrations', yPosition, pageHeight, margin, contentWidth);
            formData.painPoints.forEach(pain => {
                yPosition = checkPageBreak(doc, yPosition, 25);
                doc.setFont(undefined, 'bold');
                const splitPain = doc.splitTextToSize(pain.point, contentWidth - 5);
                doc.text(splitPain, margin + 5, yPosition);
                yPosition += splitPain.length * 5;
                doc.setFont(undefined, 'normal');

                if (pain.quote) {
                    yPosition += 3;
                    doc.setFont(undefined, 'italic');
                    doc.setTextColor(75, 85, 99);
                    const splitQuote = doc.splitTextToSize('"' + pain.quote + '"', contentWidth - 10);
                    doc.text(splitQuote, margin + 10, yPosition);
                    yPosition += splitQuote.length * 5;
                    doc.setFont(undefined, 'normal');
                    doc.setTextColor(0, 0, 0);
                }
                yPosition += 5;
            });
        }

        // Behaviors & Preferences
        yPosition = addSection(doc, 'Behaviors & Preferences', yPosition, pageHeight, margin, contentWidth);
        if (formData.infoSources.length > 0) {
            yPosition = checkPageBreak(doc, yPosition, 15);
            doc.setFont(undefined, 'bold');
            doc.text('Current HR Information Sources:', margin + 5, yPosition);
            doc.setFont(undefined, 'normal');
            yPosition += 6;
            yPosition = addBulletList(doc, formData.infoSources, yPosition, pageHeight, margin + 5, contentWidth - 5);
        }
        if (formData.commChannels.length > 0) {
            yPosition = checkPageBreak(doc, yPosition, 15);
            doc.setFont(undefined, 'bold');
            doc.text('Preferred Communication Channels:', margin + 5, yPosition);
            doc.setFont(undefined, 'normal');
            yPosition += 6;
            yPosition = addBulletList(doc, formData.commChannels, yPosition, pageHeight, margin + 5, contentWidth - 5);
        }
        if (formData.behaviors) {
            yPosition = checkPageBreak(doc, yPosition, 20);
            doc.setFont(undefined, 'bold');
            doc.text('Observed Behaviors:', margin + 5, yPosition);
            doc.setFont(undefined, 'normal');
            yPosition += 6;
            const splitBehaviors = doc.splitTextToSize(formData.behaviors, contentWidth - 10);
            doc.text(splitBehaviors, margin + 10, yPosition);
            yPosition += splitBehaviors.length * 5 + 5;
        }

        // Needs from HR AI
        if (formData.needs.length > 0) {
            yPosition = addSection(doc, 'Needs from HR AI Assistant', yPosition, pageHeight, margin, contentWidth);
            yPosition = addBulletList(doc, formData.needs, yPosition, pageHeight, margin, contentWidth);
            if (formData.successCriteria) {
                yPosition = checkPageBreak(doc, yPosition, 20);
                doc.setFont(undefined, 'bold');
                doc.text('Success Criteria:', margin + 5, yPosition);
                doc.setFont(undefined, 'normal');
                yPosition += 6;
                const splitCriteria = doc.splitTextToSize(formData.successCriteria, contentWidth - 10);
                doc.text(splitCriteria, margin + 10, yPosition);
                yPosition += splitCriteria.length * 5 + 5;
            }
        }

        // Use Case Scenarios
        if (formData.scenarios.length > 0) {
            yPosition = addSection(doc, 'Use Case Scenarios', yPosition, pageHeight, margin, contentWidth);
            formData.scenarios.forEach((scenario, index) => {
                yPosition = checkPageBreak(doc, yPosition, 15);
                doc.setFont(undefined, 'bold');
                doc.text(`Scenario ${index + 1}:`, margin + 5, yPosition);
                doc.setFont(undefined, 'normal');
                yPosition += 6;
                const splitScenario = doc.splitTextToSize(scenario, contentWidth - 10);
                doc.text(splitScenario, margin + 10, yPosition);
                yPosition += splitScenario.length * 5 + 5;
            });
        }

        // Research Validation
        yPosition = addSection(doc, 'Research Validation', yPosition, pageHeight, margin, contentWidth);
        const researchInfo = [`Interviews Conducted: ${formData.interviewCount}`];
        if (formData.researchMethods.length > 0) {
            researchInfo.push(`Research Methods: ${formData.researchMethods.join(', ')}`);
        }
        if (formData.researchNotes) {
            researchInfo.push(`Notes: ${formData.researchNotes}`);
        }
        yPosition = addBulletList(doc, researchInfo, yPosition, pageHeight, margin, contentWidth);

        // Footer
        const footerY = pageHeight - 15;
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('HR AI Assistant Project - User-Centered Design', margin, footerY);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, footerY, { align: 'right' });

        // Save the PDF
        const filename = `persona-${formData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
        doc.save(filename);
    }

    function addSection(doc, title, yPos, pageHeight, margin, contentWidth) {
        yPos = checkPageBreak(doc, yPos, 15);
        doc.setFillColor(37, 99, 235);
        doc.rect(margin, yPos - 5, contentWidth, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(title, margin + 3, yPos + 2);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        return yPos + 12;
    }

    function addBulletList(doc, items, yPos, pageHeight, margin, contentWidth) {
        items.forEach(item => {
            yPos = checkPageBreak(doc, yPos, 10);
            const bullet = '• ';
            const splitText = doc.splitTextToSize(item, contentWidth - 10);
            doc.text(bullet, margin + 5, yPos);
            doc.text(splitText, margin + 10, yPos);
            yPos += splitText.length * 5 + 2;
        });
        return yPos + 3;
    }

    function checkPageBreak(doc, yPos, requiredSpace) {
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;

        if (yPos + requiredSpace > pageHeight - margin) {
            doc.addPage();
            return margin;
        }
        return yPos;
    }
});
