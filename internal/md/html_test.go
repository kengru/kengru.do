package md

import "testing"

func TestProcessLine(t *testing.T) {
	boldTestLine := "I have **always** been that way"
	boldTestLine2 := "I have **always** been **that** way"
	boldTestLine3 := "**I** have **always** been **that** **way**"
	boldExpectedLine := "I have <b>always</b> been that way"
	boldExpectedLine2 := "I have <b>always</b> been <b>that</b> way"
	boldExpectedLine3 := "<b>I</b> have <b>always</b> been <b>that</b> <b>way</b>"

	italicTestLine := "I have _always_ been that way"
	italicTestLine2 := "I have _always_ been _that_ way"
	italicTestLine3 := "_I_ have _always_ been _that_ _way_"
	italicExpectedLine := "I have <i>always</i> been that way"
	italicExpectedLine2 := "I have <i>always</i> been <i>that</i> way"
	italicExpectedLine3 := "<i>I</i> have <i>always</i> been <i>that</i> <i>way</i>"
	t.Run("should process a bold item in a line", func(t *testing.T) {
		got := processLine(boldTestLine)
		if got != boldExpectedLine {
			t.Fatalf(`wanted "%s", got "%s"`, boldExpectedLine, got)
		}
	})
	t.Run("should process two bold item in one line", func(t *testing.T) {
		got := processLine(boldTestLine2)
		if got != boldExpectedLine2 {
			t.Fatalf(`wanted "%s", got "%s"`, boldExpectedLine2, got)
		}
	})
	t.Run("should process any amount of bold item in a line", func(t *testing.T) {
		got := processLine(boldTestLine3)
		if got != boldExpectedLine3 {
			t.Fatalf(`wanted "%s", got "%s"`, boldExpectedLine3, got)
		}
	})
	t.Run("should process a italic item in a line", func(t *testing.T) {
		got := processLine(italicTestLine)
		if got != italicExpectedLine {
			t.Fatalf(`wanted "%s", got "%s"`, italicExpectedLine, got)
		}
	})
	t.Run("should process two italic item in one line", func(t *testing.T) {
		got := processLine(italicTestLine2)
		if got != italicExpectedLine2 {
			t.Fatalf(`wanted "%s", got "%s"`, italicExpectedLine2, got)
		}
	})
	t.Run("should process any amount of italic item in a line", func(t *testing.T) {
		got := processLine(italicTestLine3)
		if got != italicExpectedLine3 {
			t.Fatalf(`wanted "%s", got "%s"`, italicExpectedLine3, got)
		}
	})
}

func TestReplaceToken(t *testing.T) {
	testOne := "I @have@ something @w@ he."
	expectedOne := "I <code>have</code> something <code>w</code> he."
	got := replaceToken(testOne, "@", "<code>", "</code>")
	if got != expectedOne {
		t.Fatalf(`got "%s", wanted "%s"`, got, expectedOne)
	}
}
