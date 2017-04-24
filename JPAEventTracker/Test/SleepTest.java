import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Sleep;

public class SleepTest {

	private EntityManagerFactory emf;
	private EntityManager em;
	Sleep sleep;
	
	@Test
	public void test() {
	  boolean pass = true;
	  assertEquals(pass, true);
	}

	  @Before
	  public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventTracker");
		em = emf.createEntityManager();
		sleep=em.find(Sleep.class, 1);	
	  }
	  
	  @Test
	  public void test_ability_to_get_sleep() {
		 assertEquals("Monday", sleep.getDayOfWeek());
	  }

		@After
		public void tearDown() throws Exception {
			em.close();
			emf.close();
		}
}
