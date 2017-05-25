Ext.ns('as.app.controller.FrontController');
as.app.controller.FrontController = function(){

    var _controllers = {};

    /**
     * @namespace as.app.controller.FrontController
     * @scope App
     * @param {Object} front Front Controller.
     * @type Void
     */
    var _initControllers    = function _initControllers(front) {
        
        _controllers.app = new as.app.controller.AppController({
            front:front
        });
        return _controllers;
    }

    /**
     * @function
     * @private
     * @return The controller map.
     * @type Object
     */
    var _getControllers     = function _getControllers(){
        return _controllers;
    };


    /**
     * @namespace as.app.controller.FrontController
     * @scope App
     * @param {Object} front Front Controller.
     * @type Void
     */
    var _destroyControllers = function _destroyControllers(){
        Ext.iterate(_controllers,function(key,ctrl){
            ctrl.destroy();
        },this);
        _controllers = null;
    }



    /**
     * @scope as.app.controller.FrontController#
     */
    var FrontCtrlAjaxLst = function(scope){

        var encodeData = function(data){
            Ext.iterate(data,function(key,value,object){
                if(Ext.isObject(value)){
                    value = this.encodeData(value);
                }
            },this);
        };
        
        return {

            scope               : this,
            beforerequest       : function(conn, opt){
                if(this.shutingDown){
                    return false;
                }
                opt.url     = opt.url || '../app/bridge.php';
                opt.params  = opt.params || {};



            },
            requestcomplete     : function(conn, res, opt){

                var json;

                if(this.shutingDown){
                    return false;
                }

                if(this.initialized) this.getAjaxLoadMask().hide();

                try {
                    json     = Ext.decode(res.responseText);
                    res.json = json;
                } catch (exception) {
                    json = false;
                }
            },
            requestexception    : function(){
                if(console && console.error){
                    console.error("Server Error",arguments);
                }
            }
        }
    }
    
    
    
    return {

        _lst        : {},

        _msg        : {
            loaderTitle :'Initializing Application',
            init        :'Starting up internals...',
            data        :'Preloading external data...'
        },

        initDataTask   : {},

        initialized     : false,
        shutingDown     : false,

        
        getCtrl         :function(name){
            return _getControllers()['name']
        },
        
        
        initialize               : function() {

            this.shutingDown    = false;
            this.isDataInit     = false;

            // console.warn("%s.initialize: Init Application",this);

            // control garbage
            Ext.EventManager.addListener(window,'unload', this.hdlWindowUnload,this);

            Ext.BLANK_IMAGE_URL = './js/ext/resources/images/default/s.gif';

            Ext.QuickTips.init();

            this._initAjax();

            this._initControllers();

            // Ext.MessageBox.progress(this._msg.init, this._msg.loaderTitle);
        },

        _initControllers        : function(){
            var ctrl = _initControllers(this);
            Ext.iterate(_getControllers(),function(key,ctrl){
                ctrl.initialize();
            },this)
        },
        _initAjax                 : function(){
            // console.info("%s.initAjax: install connection listeners",this);
            this._lst.ajax = new FrontCtrlAjaxLst(this);
            Ext.Ajax.on(this._lst.ajax);
        },
        hdlWindowUnload : function(){
            // clean up code.
        },
        destroy         :function(){}
    }

    
}


