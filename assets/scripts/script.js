function showOnly(id) {
    const sections = ["all-jobs", "interview-list", "rejected-list"];

    sections.forEach(section => {
        document.getElementById(section).classList.add("hidden");
    });

    if (id === "all-jobs") {
        document.getElementById("all-jobs").classList.remove("hidden");
    }
    if (id === "interview-list") {
        document.getElementById("interview-list").classList.remove("hidden");
    }
    if (id === "rejected-list") {
        document.getElementById("rejected-list").classList.remove("hidden");
    }
    updateJobCount();

    const buttons = {
        "all-jobs": "all-btn",
        "interview-list": "interview-btn",
        "rejected-list": "rejected-btn"
    };

    Object.values(buttons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.classList.remove("active-btn");
        btn.classList.add("inactive-btn");
    });

    const activeBtn = document.getElementById(buttons[id]);
    activeBtn.classList.remove("inactive-btn");
    activeBtn.classList.add("active-btn");
}

function updateEmptyState(id) {
    const container = document.getElementById(id);
    const emptyMessage = container.querySelector(".empty-message");

    const jobCards = [...container.children].filter(child =>
        child.id && child.id.startsWith("job-")
    );

    if (jobCards.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }
}

function moveToInterview(id) {
    const job = document.getElementById(id);
    const interviewList = document.getElementById("interview-list");


    interviewList.appendChild(job);

    const statusBtn = job.querySelector(".job-status");
    statusBtn.textContent = "Interview";
    statusBtn.classList.replace("bg-[#EEF4FF]", "bg-[#10B981]");
    statusBtn.classList.replace("bg-[#EF4444]", "bg-[#10B981]");
    statusBtn.classList.replace("text-[#002C5C]", "text-white");

    updateEmptyState("interview-list");
    updateEmptyState("rejected-list");
    updateJobCount();
}

function moveToRejected(id) {
    const job = document.getElementById(id);
    const rejectedList = document.getElementById("rejected-list");

    rejectedList.appendChild(job);

    const statusBtn = job.querySelector(".job-status");
    statusBtn.textContent = "Rejected";
    statusBtn.classList.replace("bg-[#EEF4FF]", "bg-[#EF4444]");
    statusBtn.classList.replace("bg-[#10B981]", "bg-[#EF4444]");
    statusBtn.classList.replace("text-[#002C5C]", "text-white");

    updateEmptyState("rejected-list");
    updateEmptyState("interview-list");
    updateJobCount();
}

function moveToAll(id) {
    const job = document.getElementById(id);
    const allJobs = document.getElementById("all-jobs");

    allJobs.appendChild(job);

    const statusBtn = job.querySelector(".job-status");
    statusBtn.textContent = "Not Applied";

    updateEmptyState("interview-list");
    updateEmptyState("rejected-list");
    updateJobCount();
}

function deleteJob(id) {
    const job = document.getElementById(id);
    job.remove();
    updateEmptyState("all-jobs");
    updateEmptyState("interview-list");
    updateEmptyState("rejected-list");
    updateJobCount();
}

function updateJobCount() {
    const jobCount = document.getElementById("job-count");

    const sections = ["all-jobs", "interview-list", "rejected-list"];
    let activeSection = null;

    sections.forEach(sectionId => {
        const container = document.getElementById(sectionId);
        if (!container.classList.contains("hidden")) {
            activeSection = container;
        }
    });

    if (!activeSection) return;

    const jobCards = [...activeSection.children].filter(child =>
        child.id && child.id.startsWith("job-")
    );

    jobCount.textContent = jobCards.length;
}






