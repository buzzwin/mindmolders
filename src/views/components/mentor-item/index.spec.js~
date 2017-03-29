import { Simulate } from 'react-addons-test-utils';
import { createTestComponent } from 'test/utils';
import { Mentor } from 'src/core/mentors';
import MentorItem from './index';


describe('MentorItem', () => {
  let mentor;
  let mentorItem;


  beforeEach(() => {
    mentor = new Mentor({completed: true, title: 'test'});

    mentorItem = createTestComponent(MentorItem, {
      mentor,
      deleteMentor: sinon.spy(),
      updateMentor: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should initialize #state.editing to be false', () => {
      expect(mentorItem.state.editing).toEqual(false);
    });

    it('should initialize #props.mentor with a Mentor instance', () => {
      expect(mentorItem.props.mentor instanceof Mentor).toBe(true);
    });
  });


  describe('Component methods:', () => {
    describe('#delete', () => {
      it('should call #mentorActions.deleteMentor', () => {
        mentorItem.delete();
        expect(mentorItem.props.deleteMentor.callCount).toEqual(1);
        expect(mentorItem.props.deleteMentor.calledWith(mentorItem.props.mentor)).toEqual(true);
      });
    });

    describe('#editTitle', () => {
      it('should set #state.editing to `true`', () => {
        mentorItem.editTitle();
        expect(mentorItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing', () => {
      it('should set #state.editing to `false`', () => {
        mentorItem.state.editing = true;
        mentorItem.stopEditing();
        expect(mentorItem.state.editing).toEqual(false);
      });
    });

    describe('#saveTitle', () => {
      it('should do nothing if not editing', () => {
        mentorItem.stopEditing = sinon.spy();
        mentorItem.state.editing = false;
        mentorItem.saveTitle();
        expect(mentorItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        mentorItem.state.editing = true;
        mentorItem.saveTitle({
          target: {value: ''}
        });
        expect(mentorItem.state.editing).toEqual(false);
      });

      it('should call #mentorActions.updateMentor', () => {
        mentorItem.state.editing = true;
        mentorItem.saveTitle({
          target: {value: 'foo'}
        });
        expect(mentorItem.props.updateMentor.callCount).toEqual(1);
        expect(mentorItem.props.updateMentor.args[0][0]).toEqual(mentor);
        expect(mentorItem.props.updateMentor.args[0][1].title).toEqual('foo');
      });
    });

    describe('#toggleStatus', () => {
      it('should call #mentorActions.updateMentor', () => {
        mentorItem.toggleStatus({
          target: {checked: true}
        });

        expect(mentorItem.props.updateMentor.callCount).toEqual(1);
      });

      it('should toggle mentor.complete', () => {
        mentorItem.toggleStatus();
        expect(mentorItem.props.updateMentor.args[0][1].completed).toEqual(!mentor.completed);
      });
    });

    describe('#onKeyUp', () => {
      describe('with enter key', () => {
        it('should call #saveTitle with event object', () => {
          mentorItem.saveTitle = sinon.spy();
          mentorItem.onKeyUp({keyCode: 13});
          expect(mentorItem.saveTitle.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          mentorItem.state.editing = true;
          mentorItem.onKeyUp({keyCode: 27});
          expect(mentorItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('`click` event triggered on toggle-status button', () => {
      it('should call #toggleStatus()', () => {
        mentorItem.toggleStatus = sinon.spy();
        mentorItem.setState({editing: true});
        Simulate.click(mentorItem.toggleStatusButton);
        expect(mentorItem.toggleStatus.callCount).toEqual(1);
      });
    });


    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        mentorItem.setState({editing: true});
        let element = mentorItem.titleInput;
        expect(element.tagName).toEqual('INPUT');
      });

      it('should be rendered as text when not editing', () => {
        mentorItem.setState({editing: false});
        let element = mentorItem.titleText;
        expect(element.innerText).toEqual(mentor.title);
      });
    });


    describe('`blur` event triggered on text field', () => {
      it('should call #saveTitle()', () => {
        mentorItem.saveTitle = sinon.spy();
        mentorItem.setState({editing: true});
        Simulate.blur(mentorItem.titleInput);
        expect(mentorItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and mentor title', () => {
        mentorItem.setState({editing: true});
        Simulate.blur(mentorItem.titleInput);
        expect(mentorItem.titleInput).toBe(null);
        expect(mentorItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with enter key on text field', () => {
      it('should call #saveTitle()', () => {
        mentorItem.saveTitle = sinon.spy();
        mentorItem.setState({editing: true});
        Simulate.keyUp(mentorItem.titleInput, {keyCode: 13});
        expect(mentorItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and mentor title', () => {
        mentorItem.setState({editing: true});
        Simulate.keyUp(mentorItem.titleInput, {keyCode: 13});
        expect(mentorItem.titleInput).toBe(null);
        expect(mentorItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with escape key on text field', () => {
      it('should call #stopEditing()', () => {
        mentorItem.stopEditing = sinon.spy();
        mentorItem.setState({editing: true});
        Simulate.keyUp(mentorItem.titleInput, {keyCode: 27});
        expect(mentorItem.stopEditing.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and mentor title', () => {
        mentorItem.setState({editing: true});
        Simulate.keyUp(mentorItem.titleInput, {keyCode: 27});
        expect(mentorItem.titleInput).toBe(null);
        expect(mentorItem.titleText).toBeDefined();
      });
    });


    describe('`click` event triggered on edit button', () => {
      it('should display text field', () => {
        Simulate.click(mentorItem.editButton);
        expect(mentorItem.titleInput).toBeDefined();
      });

      it('should hide mentor title', () => {
        Simulate.click(mentorItem.editButton);
        expect(mentorItem.titleText).toBe(null);
      });
    });


    describe('`click` event triggered on delete button', () => {
      it('should call #delete()', () => {
        mentorItem.delete = sinon.spy();
        mentorItem.setState({editing: true});
        Simulate.click(mentorItem.deleteButton);
        expect(mentorItem.delete.callCount).toEqual(1);
      });
    });
  });
});
