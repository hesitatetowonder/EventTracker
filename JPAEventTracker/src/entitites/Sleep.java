package entitites;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sleep")
public class Sleep {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private double sleepTime, wakeTime;
	
	private int quality;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getSleepTime() {
		return sleepTime;
	}

	public void setSleepTime(double sleepTime) {
		this.sleepTime = sleepTime;
	}

	public double getWakeTime() {
		return wakeTime;
	}

	public void setWakeTime(double wakeTime) {
		this.wakeTime = wakeTime;
	}

	public int getQuality() {
		return quality;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	@Override
	public String toString() {
		return "Sleep id=" + id + ", sleepTime=" + sleepTime + ", wakeTime=" + wakeTime + ", quality=" + quality;
	}
	

}
