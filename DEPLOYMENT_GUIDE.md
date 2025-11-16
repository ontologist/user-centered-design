# GitHub Pages Deployment Guide

## Quick Setup Instructions

Your website has been created and pushed to GitHub! Follow these steps to enable GitHub Pages:

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/ontologist/user-centered-design
2. Click on **Settings** (top navigation)
3. Scroll down to **Pages** (left sidebar under "Code and automation")
4. Under **Source**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### 2. Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-2 minutes
- Your site will be available at: **https://ontologist.github.io/user-centered-design/**

### 3. Verify Deployment

1. After a few minutes, refresh the Settings > Pages page
2. You should see: "Your site is live at https://ontologist.github.io/user-centered-design/"
3. Click the link to view your website

## Website Structure

Your site includes:

- **index.html** - Homepage with project overview and design thinking process
- **context.html** - Project background, challenges, and success criteria
- **stakeholders.html** - Stakeholder analysis and user personas
- **phase1-empathize.html** - Empathize phase guide
- **phase2-define.html** - Define phase guide
- **phase3-ideate.html** - Ideate phase guide
- **phase4-prototype.html** - Prototype phase guide
- **phase5-implement.html** - Implementation phase guide
- **templates.html** - User research templates and frameworks
- **resources.html** - Best practices and recommended reading
- **css/style.css** - Professional responsive styling

## Making Updates

To update the website:

1. Edit the HTML files locally
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. GitHub Pages will automatically rebuild (1-2 minutes)

## Key Features

### Design Thinking Framework
- Structured 5-phase process tailored to your HR AI project
- Clear objectives and deliverables for each phase
- Success criteria to know when each phase is complete

### Project Context
- Analysis of current challenges from your meeting notes
- Stakeholder mapping with engagement strategies
- Risk assessment with mitigation plans
- Clear prioritization of issues

### User Personas
- Three primary personas: Employee, Manager, HR Admin
- Research-driven approach with placeholders for actual data
- Clear needs, pain points, and use cases for each

### Templates & Tools
- User interview scripts
- Journey mapping frameworks
- Requirements documentation templates
- Usability testing protocols
- MoSCoW prioritization worksheets

### Best Practices
- Industry-standard methodologies (Stanford d.school, IDEO, Design Council)
- Usability heuristics and testing guidelines
- AI/chatbot-specific design principles
- Stakeholder management tactics

## Sharing with Team

Once deployed, share this link with your team:
**https://ontologist.github.io/user-centered-design/**

This website will serve as:
- Single source of truth for requirements
- Framework for user research
- Communication tool with stakeholders
- Documentation hub for the project

## Timeline Alignment

This website fulfills Yuri's action item to "Share a wiki and templates outlining user-centric design process and gathering requirements by Monday."

The content directly addresses the meeting discussion points:
- User-driven design approach
- Templates for requirements gathering
- Clear process for stakeholder alignment
- Framework for managing scope

## Next Steps

1. Enable GitHub Pages (see instructions above)
2. Share the URL with Diana, Paige, Lydia, and the team
3. Use in Tuesday's 9:00 AM HR leadership meeting
4. Begin Empathy phase research using the templates provided

## Support

If you encounter any issues with GitHub Pages deployment:
- Check the Actions tab in your repo for build status
- Ensure the main branch contains all the files
- Verify Settings > Pages shows the correct branch

---

Website created: November 16, 2025
Deployed to: https://ontologist.github.io/user-centered-design/
