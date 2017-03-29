import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import MentorForm from './index';


describe('MentorForm', () => {
  let mentorForm;


  beforeEach(() => {
    mentorForm = createTestComponent(MentorForm, {
      createMentor: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.title with an empty string', () => {
      expect(mentorForm.state.title).toEqual('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.title with an empty string', () => {
        mentorForm.state.title = 'foo';
        expect(mentorForm.state.title).toEqual('foo');

        mentorForm.clearInput();
        expect(mentorForm.state.title).toEqual('');
      });
    });





    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          mentorForm.state.title = 'foo';
          mentorForm.onKeyUp({keyCode: 27});
          expect(mentorForm.state.title).toEqual('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        mentorForm.onSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call mentorActions#createMentor with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        mentorForm.state.title = 'foo';
        mentorForm.onSubmit(event);

        expect(mentorForm.props.createMentor.callCount).toEqual(1);
        expect(mentorForm.props.createMentor.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        mentorForm.state.title = 'foo';
        mentorForm.onSubmit(event);

        expect(mentorForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        mentorForm.state.title = '';
        mentorForm.onSubmit(event);

        expect(mentorForm.props.createMentor.callCount).toBe(0);

        mentorForm.state.title = '    ';
        mentorForm.onSubmit(event);

        expect(mentorForm.props.createMentor.callCount).toBe(0);
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        mentorForm.setState({title: 'foo'});
        Simulate.keyUp(mentorForm.titleInput, {keyCode: 27});
        expect(mentorForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        mentorForm.setState({title: 'foo'});
        Simulate.keyUp(mentorForm.titleInput, {keyCode: 27});
        expect(mentorForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        mentorForm.titleInput.value = 'foo';
        expect(mentorForm.state.title).toEqual('');
        Simulate.change(mentorForm.titleInput);
        expect(mentorForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(mentorForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        mentorForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(mentorForm), event);
        expect(mentorForm.titleInput.value).toEqual('');
      });
    });
  });
});
