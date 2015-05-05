"use strict";

var numState = statesJson.length;

// $(function () {
var State = Backbone.Model.extend({
    defaults: function(){
        return {
            name:null,
            image:null,
            active:false,
            transitionProbabilities:[],
            accumulateTransition:[]
        };
    },
    start: function(){
        // debugger
        this.set("active", true);
        console.log(this.get("playing"));
    },
    stop: function(){
        this.set("active", false);
        console.log(this.get("playing"));
    },
    setProbability: function(ProbList){
        var tProb = this.attributes.transitionProbabilities;
        var sum=_.sum(ProbList);
        for(var i=0; i<ProbList.length; i++){
            tProb[i] = ProbList[i] / sum;
        }
        var accuProb = this.attributes.accumulateTransition;
        accuProb[0] = tProb[0];
        for(var i=1; i<ProbList.length; i++){
            accuProb[i] = accuProb[i-1] + tProb[i];
        }
    }
});

// [1,2,3,4], 2.3 => return 1
var accuIdx=function(accuProb, level){
    var array = accuProb.filter(function(a){return a < level;});
    return array.length;
};

var StateList = Backbone.Collection.extend({
    model: State,
    switchState:function(){
        var currentState = this.where({active:true})[0];
        var tAccuProb = currentState.attributes.accumulateTransition;
        var toss = Math.random();
        var newState = null;
        var newStateName;
        var newStateIdx = accuIdx(tAccuProb, toss);
        newStateName = this.models[newStateIdx].attributes.name;

        if(newStateName != currentState.attributes.name){ //state changed
            console.log('switching');
            currentState.set('active', false);
            newState=this.where({name:newStateName})[0];
            newState.set('active', true);
            stateViews.forEach(function(s){
                s.updateCheckbox();
            });
        }
    },
    setProbability:function(ProbList){
        var that = this;
        for(var i=0; i<ProbList.length; i++){
            var name = stateNames[i];
            var state = that.where({name:name})[0];
            console.log(name);
            if(state == undefined) debugger
            state.setProbability(ProbList[i]);            
        }
        stateViews.forEach(function(s){
            s.updateSliders();
        });
    }
});

var StateView = Backbone.View.extend({
    tagName: "li",
    template: _.template($('#state-template').html()),
    initialize: function(){
        console.log("sv init");
        $('#state-list').append(this.render().el);
        // debugger
        for(var i=0; i<numState; i++){
            var id = '#slider-'+i;
            this.$(id).slider({min:0, max:1, step:0.01});
            this.$(id).slider('value', this.model.attributes.transitionProbabilities[i]);
        }
        this.updateCheckbox();
    },
    render: function(){
        console.log("render");
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events:{
        "slidechange": "updateSliderVal",
        "click .toggle": "toggleActive"
    },
    updateSliderVal: function(e){
        if(e.originalEvent == undefined) return; //detect non mouse related event, and not processing it
        var tProb = this.model.attributes.transitionProbabilities;
        debugger
        var id=e.target.id;
        var name=id.split('-')[1]; //"slider-sitting" => "sitting"
        var val = this.$('#'+id).slider('value');
        tProb[name] = val;
        var nOther=_.without(stateNames, name);
        var numState = nOther.length;
        var total = _.reduce(nOther, function(sum, x){
            return sum + tProb[x];
        }, 0);
        // var val0=tProb[nOther[0]];
        // var val1=tProb[nOther[1]];
        // debugger
        // var total = val+val0+val1;
        // if(val0+val1 > 0){
            // debugger
        var scope = this;
        var ratio = (1.0 - val) / (total - val);
        _.each(nOther, function(x){
            tProb[x] = tProb[x]*ratio;
            scope.$('#slider-'+x).slider('value', tProb[x]);
        })  
            // val0 *=ratio;
            // val1 *=ratio;
            // tProb[nOther[0]]=val0;
            // this.$('#slider-'+nOther[0]).slider('value', val0);
            // tProb[nOther[1]]=val1;
            // this.$('#slider-'+nOther[1]).slider('value', val1);
        // }
    },
    toggleActive: function(){
        this.model.attributes.active = ! this.model.attributes.active;
        if(this.model.attributes.active){
            // debugger
            var others = _.without(stateNames, this.model.attributes.name);
            others.forEach(function(n){
                stateList.where({name:n})[0].attributes.active = false;
            });
            stateViews.forEach(function(s){
                s.updateCheckbox();
            });
        }
    },
    updateCheckbox: function(){
        this.$('.toggle').prop('checked', this.model.attributes.active);
        if(this.model.attributes.active){
            $('#image-'+stateNames.indexOf(this.model.attributes.name)).show();
        }else{
            $('#image-'+stateNames.indexOf(this.model.attributes.name)).hide();
        }
    },
    updateSliders: function(){
        for(var i=0; i<numState; i++){
            var id = '#slider-'+i;
            this.$(id).slider({min:0, max:1, step:0.01});
            this.$(id).slider('value', this.model.attributes.transitionProbabilities[i]);
        }
    }
});

var createImageDivs=function(){
    var root = $('#markov-images');
    for(var i=0; i<numState; i++){
        var div = $('<div/>', {id:"image-"+i, class:"image"});
        var fname = statesJson[i].image;
        div.prepend('<img src="'+fname+'" class="image"/>');
        root.append(div)
    }
};

$(function(){
    createImageDivs();
    $('#state-list').hide();
    $('#toggle1').click(function(){
        if(this.checked) $('#state-list').show();
        else $('#state-list').hide();
    });

    var states = statesJson.map(function(s){return new State(s);});
    var stateList=new StateList(states);
    window.stateList = stateList;

    var stateViews=[];
    window.stateViews = stateViews;
    stateList.models.forEach(function(model){
        var sv = new StateView({model:model});
        stateViews.push(sv);
    });

    $('#samples').selectmenu()
        .on("selectmenuchange", function(event, ui){
            var name = ui.item.value;
            // debugger
            stateList.setProbability(samples.filter(function(s){return s.name == name;})[0].transition);
        });

    stateList.setProbability(samples[1].transition);

    setInterval(function(){
        stateList.switchState();
    }, 1000);
});

