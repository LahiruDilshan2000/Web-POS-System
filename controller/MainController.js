export class MainController{

    constructor() {
        $('#dash').on('click', () => {
            this.handleShowContainer('.dashMane', 'dash');
        });
        $('#cus').on('click', () => {
            this.handleShowContainer('.cusMane', 'cus');
        });
        $('#itm').on('click', () => {
            this.handleShowContainer('.itemMane', 'itm');
        });
        $('#or').on('click', () => {
            this.handleShowContainer('.orderMane', 'or');
        });
        $('#ord').on('click', () => {
            this.handleShowContainer('.orderDetailMane', 'ord');
        });
        this.handleAllHide();
        this.handleShowContainer('.dashMane', 'dash');
    }

    handleAllHide(){

        $('.dashMane').css({display: 'none'});
        $('.cusMane').css({display: 'none'});
        $('.itemMane').css({display: 'none'});
        $('.orderMane').css({display: 'none'});
        $('.orderDetailMane').css({display: 'none'});
    }
    handleShowContainer(container, btn){

        this.handleAllHide();
        $(container).css({display: 'block'});
    }
}
new MainController();