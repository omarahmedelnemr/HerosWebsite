// function showDescription(title, description) {
//     const descriptionBox = document.getElementById('event-description');
//     descriptionBox.textContent = `${title}: ${description}`;
//     descriptionBox.style.display = 'block';
// }
// // Function to dynamically add dots on the timeline-line for each event
// function addTimelineDots() {
//     const timelineLine = document.querySelector('.timeline-line');

//     // Clear existing dots
//     timelineLine.querySelectorAll('.timeDot').forEach(dot => dot.remove());

//     // Select only visible events in the active timeline section
//     const activeEvents = document.querySelector('.timeline-section.active').querySelectorAll('.timeline-event');

//     activeEvents.forEach(event => {
//         const eventRect = event.getBoundingClientRect();
//         const lineRect = timelineLine.getBoundingClientRect();
//         const eventCenter = eventRect.left - lineRect.left + (eventRect.width / 2);

//         const timeDot = document.createElement('div');
//         timeDot.classList.add('timeDot');
//         timeDot.style.left = `${eventCenter - 10}px`;
//         timelineLine.appendChild(timeDot);
//     });
// }

// function showTimeline(timelineId) {
//     // Hide all timelines
//     document.querySelectorAll('.timeline-section').forEach(section => {
//         section.classList.remove('active');
//         section.style.display = 'none';
//     });

//     // Remove active class from all tabs
//     document.querySelectorAll('.timeline-tabs button').forEach(button => {
//         button.classList.remove('active');
//     });

//     // Show the selected timeline and set the active tab
//     const activeTimeline = document.getElementById(timelineId);
//     activeTimeline.classList.add('active');
//     activeTimeline.style.display = 'block';

//     // Set the clicked button as active
//     const activeButton = Array.from(document.querySelectorAll('.timeline-tabs button')).find(button =>
//         button.onclick.toString().includes(timelineId)
//     );
//     if (activeButton) activeButton.classList.add('active');

//     // Update timeline dots for the currently visible events
//     addTimelineDots();
// }

// // Initialize by showing the first timeline
// document.addEventListener("DOMContentLoaded", () => {
//     showTimeline('timeline1');
// });


// // Call the function to add dots after the document is loaded
// // document.addEventListener("DOMContentLoaded", addTimelineDots);

function showTimeline(timelineId) {
    // Hide all timeline sections
    document.querySelectorAll('.timeline-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected timeline
    document.getElementById(timelineId).classList.add('active');

    // Update the active class for the navigation buttons
    document.querySelectorAll('.timeline-nav button').forEach(button => {
        button.classList.remove('active');
        if (button.onclick.toString().includes(timelineId)) {
            button.classList.add('active');
        }
    });
}

// Initialize by showing the first timeline
document.addEventListener("DOMContentLoaded", () => {
    showTimeline('timeline1');
});
