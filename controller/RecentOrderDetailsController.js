export class RecentOrderDetailsController{

    constructor() {
        this.handleLoadTable();
    }

    handleLoadTable(){

    }
}

export function handleRefreshTable(){
    recentOrderDetailsController.handleLoadTable();
}

let recentOrderDetailsController = new RecentOrderDetailsController();