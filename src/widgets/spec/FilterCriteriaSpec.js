define([
    'widgets/FilterCriteria',

    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query'
], function(
    WidgetUnderTest,

    domClass,
    domConstruct,
    query
) {
    describe('FilterCriteria', function() {
        var widget;
        var destroy = function (widget) {
            if (widget && widget.destroyRecursive) {
                widget.destroyRecursive();
                widget = null;
            }
        };

        beforeEach(function() {
            widget = new WidgetUnderTest({dataName: 'criteria'}, domConstruct.create('div', null, document.body));
        });

        afterEach(function() {
            destroy(widget);
        });

        describe('Sanity', function() {
            it('should create a FilterCriteria', function() {
                expect(widget).toEqual(jasmine.any(WidgetUnderTest));
            });
        });
        describe('presentation', function() {
            it('adds a css class when clicked on (checkbox checked)', function() {
                var node = query('#chkItem1', widget.domNode)[0];
                widget.clicked({
                    target: node,
                    preventDefault: function(){},
                    stopPropagation: function(){},
                    cancelBubble: false
                });

                expect(domClass.contains(node.parentNode, 'btn-success')).toEqual(true);
            });
            it('removes a css class when clicked on (checkbox unchecked)', function() {
                var node = query('#chkItem1', widget.domNode)[0];
                domClass.add(node.parentNode, 'btn-success');
                
                widget.clicked({
                    target: node,
                    preventDefault: function(){},
                    stopPropagation: function(){},
                    cancelBubble: false
                });

                expect(domClass.contains(node.parentNode, 'btn-success')).toEqual(false);
            });
        });
        describe('Gather values', function() {
            it('gathers a single value', function() {
                query('#chkItem1', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    ingredients: ['Item1']
                });
            });
            it('gathers multiple values', function() {
                query('#chkItem1', widget.domNode)[0].checked = true;
                query('#chkItem2', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    ingredients: ['Item1','Item2']
                });
            });
            it('gathers no values', function() {

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    ingredients: null
                });
            });
        });
    });
});
