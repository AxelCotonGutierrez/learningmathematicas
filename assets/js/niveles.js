function toggleSubLevels(subLevelId) {
    var subLevel = document.getElementById(subLevelId);
    if (subLevel.style.display === "none" || !subLevel.style.display) {
        subLevel.style.display = "block";
    } else {
        subLevel.style.display = "none";
    }
}

function toggleLevelDetails(levelId) {
    var levelDetail = document.getElementById(levelId);
    if (levelDetail.style.display === "none" || !levelDetail.style.display) {
        levelDetail.style.display = "block";
    } else {
        levelDetail.style.display = "none";
    }
}
