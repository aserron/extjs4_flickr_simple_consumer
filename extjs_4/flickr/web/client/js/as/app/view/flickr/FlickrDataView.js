Ext.ns('as.app.view.flickr.FlickrListView');

(function(){

/**
 * @constructor
 */
as.app.view.flickr.FlickrListView = function(cfg){

    as.app.view.flickr.FlickrListView.superclass.constructor.call(this,cfg);
};

as.app.view.flickr.FlickrListView = Ext.extend (

    as.base.list.BaseListView, {

        /**
         * @ignore
         */
        constructor   : as.app.view.flickr.FlickrListView,

        /**
         * @private
         * @type Void
         */
        initComponent : function() {

            var defaults = {};

            defaults = Ext.apply(defaults, {
                overClass     : 'flickr-item-over',
                selectedClass : 'flickr-item-selected',
                trackOver:true
            });

            Ext.apply(this,Ext.apply(this.initialConfig,defaults));

            as.app.view.flickr.FlickrListView.superclass.initComponent.apply(this,arguments);    
        },

        ////////////////////////////////////////////////////////////////////////
        // custom event
        onRender    : function(ct){
            
            as.app.view.flickr.FlickrListView.superclass.onRender.apply(this,arguments);

            
            this.loadMask         = new Ext.LoadMask(ct,{msg:"Loading.."});
            this.loadMask._onLoad = this.loadMask.onLoad;
            this.loadMask.onLoad  = Ext.emptyFn;

            this.on({
                scope           : this,
                click           : this.handleClick,
                mouseenter      : this.onMouseEnter,
                mouseleave      : this.onMouseLeave,
                selectionchange : function(){
                // console.warn('selection change',arguments);
                },

                load            :function(){
                    // console.clear();
                    this.imageCount--;
                    // console.warn("%s.l",this,this.imageCount);
                    if(this.imageCount==0) this.loadMask._onLoad()


                }

                // beforedestroy   : this.hdlBeforeDestroy

            });
        },
        refresh     : function(){

            as.app.view.flickr.FlickrListView.superclass.refresh.call(this);        

            this.itemOver = new Ext.Element(Ext.getBody().select('div.item-over').elements[0]);

            var img = this.el.select('img');

            this.imageCount = img.getCount();

            img.each(function(el){
                this.relayEvents(el,['load']);
            },this);

            this.loadMask.show();
            
        },
        handleClick : function(dv,index,node,e){            
            this.select(node);
        },     
        onMouseEnter: function(dv, index, node, e){
            
            var el = Ext.fly(node);
            var xy = el.getXY();

            xy[0] += 10;
            xy[1] += 16;

            this.itemOver.setXY(xy).show();     
        },
      
        onMouseLeave: function(dv, index, node, e){
            this.itemOver.hide();
        }
     
    }
);

})();

Ext.reg('app-flickrlistview',as.app.view.flickr.FlickrListView);