using UnityEngine;
using System.Collections;
using NUnit.Framework;

public class TestRename
{
    [Test]
    public void SameName() {
        Assert.That(KiziFile.CreateNewName("abc"), Is.EqualTo("abc 1"));
        Assert.That(KiziFile.CreateNewName("abc 1"), Is.EqualTo("abc 2"));
        Assert.That(KiziFile.CreateNewName("abcd 2"), Is.EqualTo("abcd 3"));
        Assert.That(KiziFile.CreateNewName("abcd "+int.MaxValue), Is.EqualTo("abcd "+int.MaxValue+ " 1"));
        Assert.That(KiziFile.CreateNewName("abcd -1"), Is.EqualTo("abcd -2"));
        Assert.That(KiziFile.CreateNewName("abcd -0"), Is.EqualTo("abcd -1"));
        Assert.That(KiziFile.CreateNewName("abcd 0"), Is.EqualTo("abcd 1"));
    }




}
