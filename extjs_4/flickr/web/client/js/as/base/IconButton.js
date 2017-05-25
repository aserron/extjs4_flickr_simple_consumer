Ext.ns('as.base');
as.base.IconButton = function(cfg){
    as.base.IconButton.superclass.constructor.call(this,cfg);
};
as.base.IconButton = Ext.extend(Ext.Button, {

    constructor :as.base.IconButton,

    buttonSelector : 'button',
    template: new Ext.Template(
        '<div class="main-nav-button">',
            '<div class="main-nav-icon">'
        ,'</div><div class="main-nav-button-overlay"></div><button></button></div>'),
    iconCls:'contacts_large',
    scale:'medium',
    /*
    tooltip:'xxxxxx',
    menu:[{
        text:'xxx'
    },{
        text:'xxx'
    }],*/
    menuAlign:'tr',
    onRender: function(ct, position){


        as.base.IconButton.superclass.onRender.call(this,ct, position);

        this.addListener('afterrender',function(){

        },this,{single:true})
    },
    initButtonEl : function(btn, btnEl){
        this.btnEl  = btn.child(this.buttonSelector);
        this.iconEl = btn.child("div.main-nav-icon");
        as.base.IconButton.superclass.initButtonEl.apply(this,arguments);

    },
    setIconClass : function(cls){
        this.iconCls = cls;
        if(this.el){
            this.iconEl.dom.className = "";
            this.iconEl.addClass(['main-nav-icon', cls || '']);
        }

        return this;
    }
})

Ext.reg('app-iconbutton',as.base.IconButton);