var btnInnerText = "Llegir més";
var btnInnerTextHide = "Amagar";
var collapseList = document.querySelectorAll(".collapse");



collapseList.forEach(function(collapse) {
    var btn = document.createElement("BUTTON")
    btn.innerText = btnInnerText;
    btn.classList.add("collapse__btn");
    collapse.parentNode.appendChild(btn);
    btn.addEventListener('click', function(col) {
        return function() {
            showCollapse(collapse, btn);
        }
    }(collapse, btn),true);
    
});

function showCollapse(collapse, btn){
    collapse.classList.toggle("collapse--on")
    btn.classList.toggle("collapse__btn--on")
    if (collapse.classList.contains("collapse--on")){
        btn.innerText = btnInnerTextHide
    } else {
        btn.innerText = btnInnerText
    }
}