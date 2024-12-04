function ShowSection(level){
    console.log(level)
    $(`.CourseSection.active`).removeClass("active")
    $(`.CourseSection.${level}`).addClass("active")

    $(`.timeline-nav.active`).removeClass("active")
    $(`.timeline-nav.For${level}`).addClass("active")
    $(`.timeline-nav.For${level} button`)[0].click()

}
function ShowLevel(level){
    console.log(level)
    $(`.CourseSection .levelBox.activeBox`).removeClass("activeBox")
    $(`.CourseSection.active .${level}`).addClass("activeBox")
}
var buttons = document.querySelectorAll("#TimeLineSectionContainer .timeline-nav button")



for(var button of buttons){
    button.addEventListener("click", function(event){
        document.querySelector("#TimeLineSectionContainer .timeline-nav button.active").classList.remove("active")
        event.currentTarget.classList.add("active")
        
    })
}