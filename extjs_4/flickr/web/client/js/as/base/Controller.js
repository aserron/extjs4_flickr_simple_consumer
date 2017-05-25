Ext.ns('as.base');
as.base.Controller = function(cfg){

        cfg = cfg || {};

        if(Ext.isDefined(cfg.front)){
            // console.info("%s.front",this,arguments);
            this.front = cfg.front;
        }

        /**
         * @type Object
         */
        this.listeners = cfg.listeners || {};

        as.base.Controller.superclass.constructor.call(this,cfg);

        /**
         * @type Project.View.ProjectView
         */
        this.view  = cfg.view || this.view;
        /**
         * @type Project.Model.ProjectModel
         */
        this.model = cfg.model || this.model;
        // end fix

},
as.base.Controller = Ext.extend( Ext.util.Observable,{

    constructor : as.base.Controller,
    _className  : '',
    toString    : function(){
        var name = this._className || 'Ctrl';
        return String.format('[{0}]',name);
    },

    initialize  : function(){},

    destroy     : function(){
        if(typeof(this.model.destroy)=='function') this.model.destroy();
        if(typeof(this.view.destroy)=='function')  this.view.destroy();

    },
    /**
     * @method getView
     * @return Project View object.
     * @type Project.View.ProjectView
     */
    getView : function (){
        return this.view;
    },
    /**
     * @type Project.Model.ProjectModel
     */
    getModel : function (){
        return this.model;
    }
})