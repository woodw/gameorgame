{
    /* @ngInject */
    function GameController(Games){
        var ctrl = this;

        ctrl.selected = false;
        ctrl.useCategories = false;
        ctrl.information = {};

        ctrl.$onInit = init;
        ctrl.toggleSelected = toggleSelected;
        ctrl.toggleUseCategories = toggleUseCategories;
        ctrl.reviewExpand = reviewExpand;

        function init(){

            ctrl.information = Games.get(this.gameId);
            ctrl.information.categories = ctrl.information.categories || [];
        }
        function toggleSelected($event, element){
            var categoriesSelected=0;
            
            //stop clicks from occuring on parent elements
            $event.stopPropagation();
            element = element || ctrl;
            switch(true){
            case (ctrl.useCategories && element!== ctrl):

                //if in category mode, select the category
                element.selected = !element.selected;

                //if more than half of categories are selected, then select the game
                categoriesSelected = ctrl.information.categories.reduce(function (p,c){
                    if(c.selected){
                        return p + 1;
                    }
                    return p + 0;
                },0);

                if((categoriesSelected/ctrl.information.categories.length)>.5){
                    ctrl.selected = true;
                }
                else{
                    ctrl.selected = false;
                }
                break;
            case (!ctrl.useCategories && element==ctrl):
                element.selected = !element.selected;
                break;
            }
        }
        function toggleUseCategories($event){
            $event.stopPropagation();
            ctrl.useCategories = !ctrl.useCategories;
            ctrl.selected = false;
            ctrl.information.categories.forEach(function (item){item.selected = false;}); 
        }
        function reviewExpand($event){
            $event.stopPropagation();
            var element = typeof $event === 'object' ? $event.target : document.getElementById($event);
            var scrollHeight = element.scrollHeight;
            element.style.height =  scrollHeight + "px";  
        }
    }

    //Angular Blurb
    angular
    .module('game')
    .component('game', {
        templateUrl: 'app/game/game.template.html',
        controller: GameController,
        bindings: {
            gameid: '@'
        }
    });

}