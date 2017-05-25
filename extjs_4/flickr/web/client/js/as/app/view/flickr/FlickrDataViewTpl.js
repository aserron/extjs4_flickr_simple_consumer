Ext.ns('as.app.view.flickr');
as.app.view.flickr.FlickrDataViewTpl = new Ext.XTemplate(    
    '<tpl if="this.test(values)">',
        '<div class="item" id="item_{#}">',            
            '<div class="thumb-wrap" alt="project image" >',
                
                '<div class="thumb" style="float:left">',
                    '<img width="224" height="143" src="{[this.getSrc(values)]}" title="{title}"/>',
                '</div>',
            '</div>',
            '<h3 class="title">{[this.renderTitle(values)]}</h3>',
            '<div class="x-clear"></div>',
        '</div>',
'</tpl>',{
    compiled    : true,
    renderTitle  : function(values){
        var frm   = Ext.util.Format;
        var title = frm.ellipsis(values.title,40,false);
        return frm.ellipsis(title, 40, true);
    },
    getSrc      : function(values){
        return values.media.m;
    },
    test        :function(){        
        return true;
    }
})
