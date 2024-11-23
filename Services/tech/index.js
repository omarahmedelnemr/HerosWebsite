function ShowLevel(level){
    console.log(level)
    $(`.CourseSection .levelBox.activeBox`).removeClass("activeBox")
    $(`.CourseSection.active .${level}`).addClass("activeBox")
}