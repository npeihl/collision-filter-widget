define([
    'widgets/FilterIsland',
    
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query'
], function(
    WidgetUnderTest,

    domClass,
    domConstruct,
    query
) {
    describe('FilterIsland', function() {
        var widget;
        var destroy = function (widget) {
            if (widget && widget.destroyRecursive) {
                widget.destroyRecursive();
                widget = null;
            }
        };

        beforeEach(function() {
            widget = new WidgetUnderTest(null, domConstruct.create('div', null, document.body));
        });

        afterEach(function() {
            destroy(widget);
        });

        describe('Sanity', function() {
            it('should create a FilterIsland', function() {
                expect(widget).toEqual(jasmine.any(WidgetUnderTest));
            });
        });
        describe('presentation', function() {
            it('adds a css class when clicked on (checkbox checked)', function() {
                var node = query('input[type="checkbox"][value="Orcas"]', widget.domNode)[0];
                widget.clicked({
                    target: node,
                    preventDefault: function(){},
                    stopPropagation: function(){},
                    cancelBubble: false
                });

                expect(domClass.contains(node.parentNode, 'btn-success')).toEqual(true);
            });
            it('removes a css class when clicked on (checkbox unchecked)', function() {
                var node = query('input[type="checkbox"][value="Orcas"]', widget.domNode)[0];
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
                query('input[type="checkbox"][value="Orcas"]', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    islands: ['Orcas']
                });
            });
            it('gathers multiple values', function() {
                query('input[type="checkbox"][value="Lopez"]', widget.domNode)[0].checked = true;
                query('input[type="checkbox"][value="San Juan"]', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    islands: ['Lopez','San Juan']
                });
            });
            it('gathers no values', function() {

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    islands: null
                });
            });
        });
    });
});

