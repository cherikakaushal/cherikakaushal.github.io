import sys
sys.path.insert(0, ".resume-deps")

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    KeepTogether, HRFlowable
)

OUT = "resume/Cherika_Kaushal_Resume.pdf"
VIOLET = colors.HexColor("#5B21B6")
INK = colors.HexColor("#151515")
MUTED = colors.HexColor("#4B4B4B")

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=23, leading=23, textColor=INK, spaceAfter=1.5),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=8.4, leading=10, textColor=VIOLET, charSpace=.35, spaceAfter=2.5),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=7.5, leading=9.2, textColor=INK),
    "summary": ParagraphStyle("summary", fontName="Helvetica", fontSize=8.25, leading=10.3, textColor=INK, spaceAfter=1),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=9.3, leading=10, textColor=VIOLET, charSpace=.55, spaceBefore=4.2, spaceAfter=2.5),
    "head": ParagraphStyle("head", fontName="Helvetica-Bold", fontSize=8.75, leading=10.2, textColor=INK),
    "date": ParagraphStyle("date", fontName="Helvetica-Bold", fontSize=7.6, leading=9, textColor=INK, alignment=TA_RIGHT),
    "sub": ParagraphStyle("sub", fontName="Helvetica-Oblique", fontSize=7.6, leading=9, textColor=MUTED),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=7.75, leading=9.55, textColor=INK),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=7.7, leading=9.35, textColor=INK, leftIndent=8, firstLineIndent=-5, bulletIndent=0, spaceAfter=.7),
    "project": ParagraphStyle("project", fontName="Helvetica-Bold", fontSize=8.35, leading=9.6, textColor=INK),
    "tech": ParagraphStyle("tech", fontName="Helvetica-Bold", fontSize=7.15, leading=8.4, textColor=VIOLET, spaceAfter=.5),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=7.25, leading=8.9, textColor=INK),
}

def P(text, style="body", **kw):
    return Paragraph(text, styles[style], **kw)

def section(title):
    return KeepTogether([
        Spacer(1, 1),
        Table([[P(title.upper(), "section"), HRFlowable(width="100%", thickness=.55, color=colors.HexColor("#AAAAAA"))]],
              colWidths=[46*mm, 1], style=TableStyle([("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), 0), ("BOTTOMPADDING", (0,0), (-1,-1), 0)]))
    ])

def heading(left, date):
    return Table([[P(left, "head"), P(date, "date")]], colWidths=[151*mm, 29*mm],
                 style=TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), 0), ("BOTTOMPADDING", (0,0), (-1,-1), 0)]))

def bullet(text):
    return P("• &nbsp;" + text, "bullet")

doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=10*mm, rightMargin=10*mm, topMargin=8*mm, bottomMargin=7*mm,
                      title="Cherika Kaushal — Software Engineer & Research Software",
                      author="Cherika Kaushal", subject="Software Engineering and Research Software Resume",
                      keywords="software engineer, research software, full stack, React, Next.js, Node.js, TypeScript, Python, machine learning, digital health")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates(PageTemplate(id="resume", frames=[frame]))

story = [
    P("CHERIKA KAUSHAL", "name"),
    P("SOFTWARE ENGINEER  ·  RESEARCH SOFTWARE  ·  FULL-STACK &amp; DATA SYSTEMS", "role"),
    P("Patiala, India  |  +91 62830 72808  |  <link href='mailto:cherikakaushal@gmail.com'>cherikakaushal@gmail.com</link>  |  <link href='https://www.linkedin.com/in/cherika-kaushal'>linkedin.com/in/cherika-kaushal</link>  |  <link href='https://github.com/cherikakaushal'>github.com/cherikakaushal</link>  |  <link href='https://cherikakaushal.github.io'>Portfolio</link>", "contact"),
    Spacer(1, 3), HRFlowable(width="100%", thickness=2, color=VIOLET), Spacer(1, 4),
    P("<b>Computer Science undergraduate and software engineer</b> building research platforms, production web applications, and reliable data workflows. Experience across digital health, full-stack development, REST APIs, authentication, databases, machine-learning experiments, and startup product delivery.", "summary"),
    section("Education"),
    heading("Punjabi University, Patiala — B.Tech., Computer Science &amp; Engineering  |  CGPA: 7.89/10", "2023–2027"),
    P("Coursework: Data Structures &amp; Algorithms, Operating Systems, DBMS, Computer Networks, Artificial Intelligence, Machine Learning", "small"),
    section("Research & Experience"),
    heading("IIT Ropar — Summer Research Intern", "May–Jul 2026"),
    P("Digital Health Research Software · Supervisor: Dr. Sujata Pal", "sub"),
    bullet("Engineered <b>two full-stack digital-health research platforms</b> spanning participant applications, longitudinal study workflows, researcher dashboards, and wearable-data integration."),
    bullet("Built Node.js/Express REST APIs, MongoDB/Mongoose data models, JWT authentication, email verification, and role-based access control; validated API contracts, form data, permissions, and dashboard outputs."),
    bullet("Migrated a study backend from FastAPI/PostgreSQL to Node.js/MongoDB while preserving frontend API compatibility and research workflows."),
    heading("Grubox — Software Development &amp; Marketing Intern", "Jan 2025–Present"),
    bullet("Migrated the company’s production website from Wix to <b>Next.js</b> and continue delivering frontend features, content systems, deployment updates, and digital growth initiatives."),
    heading("BuildVR — Software Development &amp; Marketing Intern", "Jan 2025–Present"),
    bullet("Develop multilingual landing pages and support immersive VR/3D product experiences through UI implementation, testing, 3D assets, deployment, and AI-assisted content workflows."),
    heading("Punjabi University — Academic Research", "Aug–Dec 2024"),
    bullet("Reviewed and synthesized research on neural-network architectures for 5G/6G communication systems under Snehkunwar Sidhu."),
    section("Selected Projects"),
]

projects = [
    ("<link href='https://github.com/mohitmehta601/women_health_research_platform'>Women’s Health Research Platform ↗</link>", "React · TypeScript · Node.js · Express · MongoDB · JWT", "Longitudinal research system for symptom and menstrual tracking, questionnaires, physiological data collection, and researcher review."),
    ("<link href='https://github.com/cherikakaushal/stress-research-platform'>Stress Management Research Platform ↗</link>", "React · TypeScript · REST APIs · MongoDB · JWT", "Session-based platform connecting validated stress assessments and wearable measurements with authenticated researcher dashboards."),
    ("<link href='https://github.com/cherikakaushal/symptom-scope'>Symptom Scope ↗</link>", "Flutter · Dart · Offline-First Mobile", "Privacy-first mobile triage app with adaptive follow-ups, red-flag screening, condition ranking, local history, and shareable reports."),
    ("<link href='https://github.com/cherikakaushal/when-systems-break'>When Systems Break ↗</link>", "Python · Pandas · NumPy · Matplotlib · ML Reliability", "Experimental framework measuring model behaviour under missing data, noise, feature degradation, and distribution shift."),
]
cells = []
for title, tech, body in projects:
    cells.append([P(title, "project"), P(tech, "tech"), P(body, "small")])
project_table = Table([[cells[0], cells[1]], [cells[2], cells[3]]], colWidths=[89*mm, 89*mm], hAlign="LEFT")
project_table.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 4), ("TOPPADDING", (0,0), (-1,-1), 1), ("BOTTOMPADDING", (0,0), (-1,-1), 2)]))
story += [project_table, section("Technical Skills")]

skill_rows = [
    ("Languages", "Python, C++, C, JavaScript, TypeScript, SQL, Dart"),
    ("Web &amp; Backend", "React, Next.js, Node.js, Express.js, Vite, REST APIs, JWT, RBAC, Flutter"),
    ("Data &amp; ML", "MongoDB, Mongoose, PostgreSQL, Pandas, NumPy, Matplotlib, Scikit-learn, SHAP"),
    ("Developer Tools", "Git, GitHub, Linux, VS Code, Postman, API testing, deployment"),
]
skill_table = Table([[P(f"<b>{a}</b>", "small"), P(b, "small")] for a,b in skill_rows], colWidths=[29*mm, 151*mm])
skill_table.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), .3), ("BOTTOMPADDING", (0,0), (-1,-1), .3)]))
story.append(skill_table)

left = [P("TRAINING", "section"), P("<b>IIT Kanpur</b> — Full-Stack Web Development, MERN · Jun–Jul 2024", "small"), P("<b>ISRO / IIRS</b> — AI/ML for Geodata Analysis · Aug–Sep 2024", "small"), P("<b>GDGoC PUP</b> — AI/ML Express · <font color='#5B21B6'><b>Top Achiever</b></font>", "small")]
right = [P("LEADERSHIP &amp; ACHIEVEMENTS", "section"), P("<b>Winner</b>, GDG TechSprint Hackathon · <b>Contributor</b>, GSSoC 2025", "small"), P("Executive Member, Technical Society · <b>150+ LeetCode</b> problems", "small"), P("National-Level Gold Medalist, Avantika Painting Competition", "small")]
bottom = Table([[left, right]], colWidths=[91*mm, 89*mm])
bottom.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 3), ("TOPPADDING", (0,0), (-1,-1), 0), ("BOTTOMPADDING", (0,0), (-1,-1), 0)]))
story.append(bottom)

doc.build(story)
print(OUT)
