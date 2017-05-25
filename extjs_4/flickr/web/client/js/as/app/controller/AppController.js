Ext.ns('as.app.controller');
as.app.controller.AppController = function(){};
as.app.controller.AppController = Ext.extend(as.base.Controller,{

    constructor     : function(cfg){

        cfg      = cfg || {};

        

        var _model = new as.app.model.AppModel({
            front : cfg.front,
            ctrl  : this
        })

        var _view = new as.app.view.AppView({
            model : _model
        })

        this.model = _model;
        this.view  = _view;


        _view.on({
            scope : this,
            action: this.onAction
        })

        as.app.controller.AppController.superclass.constructor.call(this,cfg);
        
    },
    onAction : function(){
        // console.warn("%s.function",this,arguments);

    }
})