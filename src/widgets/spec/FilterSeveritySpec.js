define([
    'widgets/FilterSeverity',

    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query'
], function(
    WidgetUnderTest,

    domClass,
    domConstruct,
    query
) {
    describe('FilterSeverity', function() {
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
            it('should create a FilterSeverity', function() {
                expect(widget).toEqual(jasmine.any(WidgetUnderTest));
            });
        });
        describe('presentation', function() {
            it('adds a css class when clicked on (checkbox checked)', function() {
                var node = query('input[type="checkbox"][value="1"]', widget.domNode)[0];
                widget.clicked({
                    target: node,
                    preventDefault: function() {},
                    stopPropagation: function() {},
                    cancelBubble: false
                });

                expect(domClass.contains(node.parentNode, 'btn-success')).toEqual(true);
            });
            it('removes a css class when clicked on (checkbox unchecked)', function() {
                var node = query('input[type="checkbox"][value="2"]', widget.domNode)[0];
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
                query('input[type="checkbox"][value="3"]', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    severity: ['3']
                });
            });
            it('gathers multiple values', function() {
                query('input[type="checkbox"][value="1"]', widget.domNode)[0].checked = true;
                query('input[type="checkbox"][value="2"]', widget.domNode)[0].checked = true;

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    severity: ['1','2']
                });
            });
            it('gathers no values', function() {

                widget._gatherData();
                var actual = widget.get('data');
                expect(actual).toEqual({
                    severity: null
                });
            });
        });
    });
});
