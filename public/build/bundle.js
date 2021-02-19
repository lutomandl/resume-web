
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.3' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/MenuDesktop.svelte generated by Svelte v3.32.3 */

    const file = "src/components/MenuDesktop.svelte";

    function create_fragment(ctx) {
    	let nav;
    	let ul;
    	let li0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let li1;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let li2;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t2;
    	let li3;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let t3;
    	let li4;
    	let a4;
    	let img4;
    	let img4_src_value;
    	let t4;
    	let li5;
    	let a5;
    	let img5;
    	let img5_src_value;
    	let t5;
    	let li6;
    	let a6;
    	let img6;
    	let img6_src_value;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			li1 = element("li");
    			a1 = element("a");
    			img1 = element("img");
    			t1 = space();
    			li2 = element("li");
    			a2 = element("a");
    			img2 = element("img");
    			t2 = space();
    			li3 = element("li");
    			a3 = element("a");
    			img3 = element("img");
    			t3 = space();
    			li4 = element("li");
    			a4 = element("a");
    			img4 = element("img");
    			t4 = space();
    			li5 = element("li");
    			a5 = element("a");
    			img5 = element("img");
    			t5 = space();
    			li6 = element("li");
    			a6 = element("a");
    			img6 = element("img");
    			attr_dev(img0, "class", "icon icon-active svelte-l4gpwv");
    			attr_dev(img0, "alt", "home-icon");
    			if (img0.src !== (img0_src_value = "home.svg")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file, 39, 29, 558);
    			attr_dev(a0, "href", "#home");
    			add_location(a0, file, 39, 12, 541);
    			add_location(li0, file, 38, 8, 524);
    			attr_dev(img1, "class", "icon svelte-l4gpwv");
    			attr_dev(img1, "alt", "projects-icon");
    			if (img1.src !== (img1_src_value = "projects.svg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file, 42, 33, 686);
    			attr_dev(a1, "href", "#projects");
    			add_location(a1, file, 42, 12, 665);
    			add_location(li1, file, 41, 8, 648);
    			attr_dev(img2, "class", "icon svelte-l4gpwv");
    			attr_dev(img2, "alt", "work-icon");
    			if (img2.src !== (img2_src_value = "work.svg")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file, 45, 29, 806);
    			attr_dev(a2, "href", "#work");
    			add_location(a2, file, 45, 12, 789);
    			add_location(li2, file, 44, 8, 772);
    			attr_dev(img3, "class", "icon svelte-l4gpwv");
    			attr_dev(img3, "alt", "education-icon");
    			if (img3.src !== (img3_src_value = "education.svg")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file, 48, 34, 923);
    			attr_dev(a3, "href", "#education");
    			add_location(a3, file, 48, 12, 901);
    			add_location(li3, file, 47, 8, 884);
    			attr_dev(img4, "class", "icon svelte-l4gpwv");
    			attr_dev(img4, "alt", "skills-icon");
    			if (img4.src !== (img4_src_value = "skills.svg")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file, 51, 31, 1047);
    			attr_dev(a4, "href", "#skills");
    			add_location(a4, file, 51, 12, 1028);
    			add_location(li4, file, 50, 8, 1011);
    			attr_dev(img5, "class", "icon svelte-l4gpwv");
    			attr_dev(img5, "alt", "hobbies-icon");
    			if (img5.src !== (img5_src_value = "hobbies.svg")) attr_dev(img5, "src", img5_src_value);
    			add_location(img5, file, 54, 32, 1166);
    			attr_dev(a5, "href", "#hobbies");
    			add_location(a5, file, 54, 12, 1146);
    			add_location(li5, file, 53, 8, 1129);
    			attr_dev(img6, "class", "icon svelte-l4gpwv");
    			attr_dev(img6, "alt", "contact-icon");
    			if (img6.src !== (img6_src_value = "contact.svg")) attr_dev(img6, "src", img6_src_value);
    			add_location(img6, file, 57, 32, 1287);
    			attr_dev(a6, "href", "#contact");
    			add_location(a6, file, 57, 12, 1267);
    			add_location(li6, file, 56, 8, 1250);
    			attr_dev(ul, "class", "svelte-l4gpwv");
    			add_location(ul, file, 37, 4, 511);
    			attr_dev(nav, "class", "svelte-l4gpwv");
    			add_location(nav, file, 36, 0, 501);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, img0);
    			append_dev(ul, t0);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, img1);
    			append_dev(ul, t1);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, img2);
    			append_dev(ul, t2);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(a3, img3);
    			append_dev(ul, t3);
    			append_dev(ul, li4);
    			append_dev(li4, a4);
    			append_dev(a4, img4);
    			append_dev(ul, t4);
    			append_dev(ul, li5);
    			append_dev(li5, a5);
    			append_dev(a5, img5);
    			append_dev(ul, t5);
    			append_dev(ul, li6);
    			append_dev(li6, a6);
    			append_dev(a6, img6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MenuDesktop", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuDesktop> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MenuDesktop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuDesktop",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/components/MenuMobile.svelte generated by Svelte v3.32.3 */

    const file$1 = "src/components/MenuMobile.svelte";

    // (101:4) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "menu.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Menu");
    			attr_dev(img, "class", "svelte-153b0al");
    			add_location(img, file$1, 101, 8, 1774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(101:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (99:4) {#if menuOpened}
    function create_if_block(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = "x.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Menu");
    			attr_dev(img, "class", "svelte-153b0al");
    			add_location(img, file$1, 99, 8, 1723);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(99:4) {#if menuOpened}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let nav1;
    	let ul;
    	let li0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let li1;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t2;
    	let li2;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t3;
    	let li3;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let t4;
    	let li4;
    	let a4;
    	let img4;
    	let img4_src_value;
    	let t5;
    	let li5;
    	let a5;
    	let img5;
    	let img5_src_value;
    	let t6;
    	let li6;
    	let a6;
    	let img6;
    	let img6_src_value;
    	let t7;
    	let nav0;
    	let t8;
    	let div2;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*menuOpened*/ ctx[0]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			if_block.c();
    			t0 = space();
    			div1 = element("div");
    			nav1 = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			img0 = element("img");
    			t1 = space();
    			li1 = element("li");
    			a1 = element("a");
    			img1 = element("img");
    			t2 = space();
    			li2 = element("li");
    			a2 = element("a");
    			img2 = element("img");
    			t3 = space();
    			li3 = element("li");
    			a3 = element("a");
    			img3 = element("img");
    			t4 = space();
    			li4 = element("li");
    			a4 = element("a");
    			img4 = element("img");
    			t5 = space();
    			li5 = element("li");
    			a5 = element("a");
    			img5 = element("img");
    			t6 = space();
    			li6 = element("li");
    			a6 = element("a");
    			img6 = element("img");
    			t7 = space();
    			nav0 = element("nav");
    			t8 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "burger-button svelte-153b0al");
    			toggle_class(div0, "menuOpened", /*menuOpened*/ ctx[0]);
    			add_location(div0, file$1, 97, 0, 1627);
    			attr_dev(img0, "class", "icon icon-focus svelte-153b0al");
    			attr_dev(img0, "alt", "home-icon");
    			if (img0.src !== (img0_src_value = "home.svg")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$1, 108, 54, 1959);
    			attr_dev(a0, "href", "#home");
    			add_location(a0, file$1, 108, 16, 1921);
    			add_location(li0, file$1, 107, 12, 1900);
    			attr_dev(img1, "class", "icon svelte-153b0al");
    			attr_dev(img1, "alt", "projects-icon");
    			if (img1.src !== (img1_src_value = "projects.svg")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$1, 111, 58, 2119);
    			attr_dev(a1, "href", "#projects");
    			add_location(a1, file$1, 111, 16, 2077);
    			add_location(li1, file$1, 110, 12, 2056);
    			attr_dev(img2, "class", "icon svelte-153b0al");
    			attr_dev(img2, "alt", "work-icon");
    			if (img2.src !== (img2_src_value = "work.svg")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$1, 114, 54, 2272);
    			attr_dev(a2, "href", "#work");
    			add_location(a2, file$1, 114, 16, 2234);
    			add_location(li2, file$1, 113, 12, 2213);
    			attr_dev(img3, "class", "icon svelte-153b0al");
    			attr_dev(img3, "alt", "education-icon");
    			if (img3.src !== (img3_src_value = "education.svg")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$1, 117, 59, 2422);
    			attr_dev(a3, "href", "#education");
    			add_location(a3, file$1, 117, 16, 2379);
    			add_location(li3, file$1, 116, 12, 2358);
    			attr_dev(img4, "class", "icon svelte-153b0al");
    			attr_dev(img4, "alt", "skills-icon");
    			if (img4.src !== (img4_src_value = "skills.svg")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$1, 120, 56, 2579);
    			attr_dev(a4, "href", "#skills");
    			add_location(a4, file$1, 120, 16, 2539);
    			add_location(li4, file$1, 119, 12, 2518);
    			attr_dev(img5, "class", "icon svelte-153b0al");
    			attr_dev(img5, "alt", "hobbies-icon");
    			if (img5.src !== (img5_src_value = "hobbies.svg")) attr_dev(img5, "src", img5_src_value);
    			add_location(img5, file$1, 123, 57, 2731);
    			attr_dev(a5, "href", "#hobbies");
    			add_location(a5, file$1, 123, 16, 2690);
    			add_location(li5, file$1, 122, 12, 2669);
    			attr_dev(img6, "class", "icon svelte-153b0al");
    			attr_dev(img6, "alt", "contact-icon");
    			if (img6.src !== (img6_src_value = "contact.svg")) attr_dev(img6, "src", img6_src_value);
    			add_location(img6, file$1, 126, 57, 2885);
    			attr_dev(a6, "href", "#contact");
    			add_location(a6, file$1, 126, 16, 2844);
    			add_location(li6, file$1, 125, 12, 2823);
    			attr_dev(ul, "class", "svelte-153b0al");
    			add_location(ul, file$1, 106, 8, 1883);
    			attr_dev(nav0, "class", "svelte-153b0al");
    			add_location(nav0, file$1, 129, 4, 2983);
    			attr_dev(nav1, "class", "svelte-153b0al");
    			add_location(nav1, file$1, 105, 4, 1869);
    			attr_dev(div1, "class", "menu-tab svelte-153b0al");
    			toggle_class(div1, "menuOpened", /*menuOpened*/ ctx[0]);
    			add_location(div1, file$1, 104, 0, 1825);
    			attr_dev(div2, "class", "backdrop svelte-153b0al");
    			toggle_class(div2, "menuOpened", /*menuOpened*/ ctx[0]);
    			add_location(div2, file$1, 132, 0, 2998);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			if_block.m(div0, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, nav1);
    			append_dev(nav1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(a0, img0);
    			append_dev(ul, t1);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(a1, img1);
    			append_dev(ul, t2);
    			append_dev(ul, li2);
    			append_dev(li2, a2);
    			append_dev(a2, img2);
    			append_dev(ul, t3);
    			append_dev(ul, li3);
    			append_dev(li3, a3);
    			append_dev(a3, img3);
    			append_dev(ul, t4);
    			append_dev(ul, li4);
    			append_dev(li4, a4);
    			append_dev(a4, img4);
    			append_dev(ul, t5);
    			append_dev(ul, li5);
    			append_dev(li5, a5);
    			append_dev(a5, img5);
    			append_dev(ul, t6);
    			append_dev(ul, li6);
    			append_dev(li6, a6);
    			append_dev(a6, img6);
    			append_dev(nav1, t7);
    			append_dev(nav1, nav0);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a0, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a1, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a2, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a3, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a4, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a5, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(a6, "click", /*toggleMenu*/ ctx[1], false, false, false),
    					listen_dev(div2, "click", /*toggleMenu*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			if (dirty & /*menuOpened*/ 1) {
    				toggle_class(div0, "menuOpened", /*menuOpened*/ ctx[0]);
    			}

    			if (dirty & /*menuOpened*/ 1) {
    				toggle_class(div1, "menuOpened", /*menuOpened*/ ctx[0]);
    			}

    			if (dirty & /*menuOpened*/ 1) {
    				toggle_class(div2, "menuOpened", /*menuOpened*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if_block.d();
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MenuMobile", slots, []);
    	let menuOpened = false;

    	function toggleMenu() {
    		if (menuOpened) {
    			$$invalidate(0, menuOpened = false);
    		} else {
    			$$invalidate(0, menuOpened = true);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuMobile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ menuOpened, toggleMenu });

    	$$self.$inject_state = $$props => {
    		if ("menuOpened" in $$props) $$invalidate(0, menuOpened = $$props.menuOpened);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [menuOpened, toggleMenu];
    }

    class MenuMobile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MenuMobile",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/components/Head.svelte generated by Svelte v3.32.3 */

    function create_fragment$2(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Head", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Head> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Head extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Head",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/Home.svelte generated by Svelte v3.32.3 */

    const file$2 = "src/components/Home.svelte";

    function create_fragment$3(ctx) {
    	let div3;
    	let div1;
    	let h1;
    	let t1;
    	let h20;
    	let t3;
    	let h21;
    	let t5;
    	let div0;
    	let a0;
    	let button0;
    	let t7;
    	let a1;
    	let button1;
    	let t9;
    	let div2;
    	let p;
    	let t10;
    	let br0;
    	let t11;
    	let br1;
    	let t12;
    	let br2;
    	let t13;
    	let br3;
    	let t14;
    	let br4;
    	let t15;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "LUBOS TOMANDL";
    			t1 = space();
    			h20 = element("h2");
    			h20.textContent = "SENIOR BUSINESS ANALYST/";
    			t3 = space();
    			h21 = element("h2");
    			h21.textContent = "JUNIOR FULL-STACK DEVELOPER";
    			t5 = space();
    			div0 = element("div");
    			a0 = element("a");
    			button0 = element("button");
    			button0.textContent = "LEARN MORE";
    			t7 = space();
    			a1 = element("a");
    			button1 = element("button");
    			button1.textContent = "HIRE";
    			t9 = space();
    			div2 = element("div");
    			p = element("p");
    			t10 = text("My name is Lubos.");
    			br0 = element("br");
    			t11 = text("\n            I’m 27 years old.");
    			br1 = element("br");
    			t12 = text("\n            I’ve been working as Business Analyst for 5 years.");
    			br2 = element("br");
    			t13 = text("\n            Currently I’m on my way to become full-stack developer.");
    			br3 = element("br");
    			t14 = text("\n            Wanna check out my journey?");
    			br4 = element("br");
    			t15 = text("\n            Go explore this web!");
    			attr_dev(h1, "class", "svelte-1x66lt6");
    			add_location(h1, file$2, 67, 8, 1140);
    			attr_dev(h20, "class", "svelte-1x66lt6");
    			add_location(h20, file$2, 68, 8, 1171);
    			attr_dev(h21, "class", "svelte-1x66lt6");
    			add_location(h21, file$2, 69, 8, 1213);
    			attr_dev(button0, "class", "svelte-1x66lt6");
    			add_location(button0, file$2, 72, 16, 1329);
    			attr_dev(a0, "href", "#projects");
    			add_location(a0, file$2, 71, 12, 1292);
    			attr_dev(button1, "class", "svelte-1x66lt6");
    			add_location(button1, file$2, 77, 16, 1460);
    			attr_dev(a1, "href", "#contact");
    			add_location(a1, file$2, 76, 12, 1424);
    			attr_dev(div0, "class", "buttons svelte-1x66lt6");
    			add_location(div0, file$2, 70, 8, 1258);
    			attr_dev(div1, "class", "title svelte-1x66lt6");
    			add_location(div1, file$2, 66, 4, 1112);
    			add_location(br0, file$2, 84, 28, 1614);
    			add_location(br1, file$2, 85, 29, 1648);
    			add_location(br2, file$2, 86, 62, 1715);
    			add_location(br3, file$2, 87, 67, 1787);
    			add_location(br4, file$2, 88, 39, 1831);
    			add_location(p, file$2, 84, 8, 1594);
    			attr_dev(div2, "class", "info svelte-1x66lt6");
    			add_location(div2, file$2, 83, 4, 1567);
    			attr_dev(div3, "class", "wrapper svelte-1x66lt6");
    			add_location(div3, file$2, 65, 0, 1086);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, h20);
    			append_dev(div1, t3);
    			append_dev(div1, h21);
    			append_dev(div1, t5);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(a0, button0);
    			append_dev(div0, t7);
    			append_dev(div0, a1);
    			append_dev(a1, button1);
    			append_dev(div3, t9);
    			append_dev(div3, div2);
    			append_dev(div2, p);
    			append_dev(p, t10);
    			append_dev(p, br0);
    			append_dev(p, t11);
    			append_dev(p, br1);
    			append_dev(p, t12);
    			append_dev(p, br2);
    			append_dev(p, t13);
    			append_dev(p, br3);
    			append_dev(p, t14);
    			append_dev(p, br4);
    			append_dev(p, t15);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Home", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.3 */
    const file$3 = "src/App.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let t0;
    	let header0;
    	let menudesktop;
    	let t1;
    	let header1;
    	let menumobile;
    	let t2;
    	let main;
    	let head;
    	let t3;
    	let section0;
    	let home0;
    	let t4;
    	let section1;
    	let home1;
    	let t5;
    	let section2;
    	let home2;
    	let t6;
    	let section3;
    	let home3;
    	let t7;
    	let section4;
    	let home4;
    	let t8;
    	let section5;
    	let home5;
    	let t9;
    	let section6;
    	let home6;
    	let current;
    	menudesktop = new MenuDesktop({ $$inline: true });
    	menumobile = new MenuMobile({ $$inline: true });
    	head = new Head({ $$inline: true });
    	home0 = new Home({ $$inline: true });
    	home1 = new Home({ $$inline: true });
    	home2 = new Home({ $$inline: true });
    	home3 = new Home({ $$inline: true });
    	home4 = new Home({ $$inline: true });
    	home5 = new Home({ $$inline: true });
    	home6 = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			header0 = element("header");
    			create_component(menudesktop.$$.fragment);
    			t1 = space();
    			header1 = element("header");
    			create_component(menumobile.$$.fragment);
    			t2 = space();
    			main = element("main");
    			create_component(head.$$.fragment);
    			t3 = space();
    			section0 = element("section");
    			create_component(home0.$$.fragment);
    			t4 = space();
    			section1 = element("section");
    			create_component(home1.$$.fragment);
    			t5 = space();
    			section2 = element("section");
    			create_component(home2.$$.fragment);
    			t6 = space();
    			section3 = element("section");
    			create_component(home3.$$.fragment);
    			t7 = space();
    			section4 = element("section");
    			create_component(home4.$$.fragment);
    			t8 = space();
    			section5 = element("section");
    			create_component(home5.$$.fragment);
    			t9 = space();
    			section6 = element("section");
    			create_component(home6.$$.fragment);
    			attr_dev(div, "class", "background svelte-7hdyen");
    			add_location(div, file$3, 7, 0, 246);
    			attr_dev(header0, "class", "desktop svelte-7hdyen");
    			add_location(header0, file$3, 9, 0, 279);
    			attr_dev(header1, "class", "mobile svelte-7hdyen");
    			add_location(header1, file$3, 12, 0, 331);
    			attr_dev(section0, "id", "home");
    			attr_dev(section0, "class", "pageWrapper svelte-7hdyen");
    			add_location(section0, file$3, 18, 1, 399);
    			attr_dev(section1, "id", "projects");
    			attr_dev(section1, "class", "pageWrapper svelte-7hdyen");
    			add_location(section1, file$3, 21, 1, 462);
    			attr_dev(section2, "id", "work");
    			attr_dev(section2, "class", "pageWrapper svelte-7hdyen");
    			add_location(section2, file$3, 24, 1, 530);
    			attr_dev(section3, "id", "education");
    			attr_dev(section3, "class", "pageWrapper svelte-7hdyen");
    			add_location(section3, file$3, 27, 1, 594);
    			attr_dev(section4, "id", "skills");
    			attr_dev(section4, "class", "pageWrapper svelte-7hdyen");
    			add_location(section4, file$3, 30, 1, 663);
    			attr_dev(section5, "id", "hobbies");
    			attr_dev(section5, "class", "pageWrapper svelte-7hdyen");
    			add_location(section5, file$3, 33, 1, 729);
    			attr_dev(section6, "id", "contact");
    			attr_dev(section6, "class", "pageWrapper svelte-7hdyen");
    			add_location(section6, file$3, 36, 1, 796);
    			attr_dev(main, "class", "svelte-7hdyen");
    			add_location(main, file$3, 16, 0, 381);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, header0, anchor);
    			mount_component(menudesktop, header0, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, header1, anchor);
    			mount_component(menumobile, header1, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(head, main, null);
    			append_dev(main, t3);
    			append_dev(main, section0);
    			mount_component(home0, section0, null);
    			append_dev(main, t4);
    			append_dev(main, section1);
    			mount_component(home1, section1, null);
    			append_dev(main, t5);
    			append_dev(main, section2);
    			mount_component(home2, section2, null);
    			append_dev(main, t6);
    			append_dev(main, section3);
    			mount_component(home3, section3, null);
    			append_dev(main, t7);
    			append_dev(main, section4);
    			mount_component(home4, section4, null);
    			append_dev(main, t8);
    			append_dev(main, section5);
    			mount_component(home5, section5, null);
    			append_dev(main, t9);
    			append_dev(main, section6);
    			mount_component(home6, section6, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menudesktop.$$.fragment, local);
    			transition_in(menumobile.$$.fragment, local);
    			transition_in(head.$$.fragment, local);
    			transition_in(home0.$$.fragment, local);
    			transition_in(home1.$$.fragment, local);
    			transition_in(home2.$$.fragment, local);
    			transition_in(home3.$$.fragment, local);
    			transition_in(home4.$$.fragment, local);
    			transition_in(home5.$$.fragment, local);
    			transition_in(home6.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menudesktop.$$.fragment, local);
    			transition_out(menumobile.$$.fragment, local);
    			transition_out(head.$$.fragment, local);
    			transition_out(home0.$$.fragment, local);
    			transition_out(home1.$$.fragment, local);
    			transition_out(home2.$$.fragment, local);
    			transition_out(home3.$$.fragment, local);
    			transition_out(home4.$$.fragment, local);
    			transition_out(home5.$$.fragment, local);
    			transition_out(home6.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(header0);
    			destroy_component(menudesktop);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(header1);
    			destroy_component(menumobile);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(main);
    			destroy_component(head);
    			destroy_component(home0);
    			destroy_component(home1);
    			destroy_component(home2);
    			destroy_component(home3);
    			destroy_component(home4);
    			destroy_component(home5);
    			destroy_component(home6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ MenuDesktop, MenuMobile, Head, Home });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
